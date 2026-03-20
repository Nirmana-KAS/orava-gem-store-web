import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { sendSignInGreetingEmail } from "@/lib/resend";
import { signInSchema } from "@/lib/validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(rawCredentials) {
        const parsed = signInSchema.safeParse(rawCredentials);
        if (!parsed.success) {
          throw new Error("Invalid credentials");
        }
        const { email, password } = parsed.data;
        const allowed = rateLimit(`auth:${email.toLowerCase()}`, 5, 60_000);
        if (!allowed) {
          throw new Error("Too many sign-in attempts. Please try again in a minute.");
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) throw new Error("Invalid credentials");
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Invalid credentials");
        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile(profile) {
        const firstName = profile.given_name ?? profile.name?.split(" ")[0] ?? "User";
        const lastName = profile.family_name ?? profile.name?.split(" ").slice(1).join(" ") ?? "";
        return {
          id: profile.sub,
          email: profile.email,
          firstName,
          lastName,
          image: profile.picture,
          role: Role.USER,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return true;
      const email = user.email.toLowerCase();

      if (account?.provider === "google") {
        const names = (user.name ?? "").trim().split(" ");
        const firstName = names[0] || "User";
        const lastName = names.slice(1).join(" ") || "";
        const dbUser = await prisma.user.upsert({
          where: { email },
          update: { image: user.image ?? undefined },
          create: {
            email,
            firstName,
            lastName,
            image: user.image ?? undefined,
            role: Role.USER,
            emailVerified: new Date(),
          },
        });
        user.id = dbUser.id;
      }

      const dbUser = await prisma.user.findUnique({ where: { email } });
      if (!dbUser) return true;

      user.id = dbUser.id;
      await prisma.inquiry.updateMany({
        where: { guestEmail: dbUser.email, userId: null },
        data: { userId: dbUser.id, guestEmail: null },
      });
      await prisma.meeting.updateMany({
        where: { guestEmail: dbUser.email, userId: null },
        data: { userId: dbUser.id, guestEmail: null },
      });
      void sendSignInGreetingEmail(dbUser.email, dbUser.firstName);
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

