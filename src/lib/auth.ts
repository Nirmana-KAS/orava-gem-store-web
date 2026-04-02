import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { signInSchema } from "@/lib/validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  trustHost: true,
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
          throw new Error(
            "Too many sign-in attempts. Please try again in a minute.",
          );
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
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        const firstName =
          profile.given_name ?? profile.name?.split(" ")[0] ?? "User";
        const lastName =
          profile.family_name ??
          profile.name?.split(" ").slice(1).join(" ") ??
          "";
        return {
          id: profile.sub,
          email: profile.email,
          firstName,
          lastName,
          image: profile.picture,
          role: "USER",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return true;
      const email = user.email.toLowerCase();

      if (account?.provider === "google") {
        const nameParts = (user.name ?? "").trim().split(" ").filter(Boolean);
        const firstName = nameParts[0] || user.firstName || "User";
        const lastName = nameParts.slice(1).join(" ") || user.lastName || "";
        const dbUser = await prisma.user.upsert({
          where: { email },
          update: {
            image: user.image ?? undefined,
            firstName,
            lastName,
          },
          create: {
            email,
            firstName,
            lastName,
            image: user.image ?? undefined,
            role: "USER",
            emailVerified: new Date(),
          },
        });
        user.id = dbUser.id;
        user.firstName = dbUser.firstName;
        user.lastName = dbUser.lastName;
        user.role = dbUser.role;

        await prisma.inquiry.updateMany({
          where: { guestEmail: dbUser.email, userId: null },
          data: { userId: dbUser.id, guestEmail: null },
        });
        await prisma.meeting.updateMany({
          where: { guestEmail: dbUser.email, userId: null },
          data: { userId: dbUser.id, guestEmail: null },
        });
      } else {
        const dbUser = await prisma.user.findUnique({ where: { email } });
        if (dbUser) {
          user.id = dbUser.id;
          user.firstName = dbUser.firstName;
          user.lastName = dbUser.lastName;
          user.role = dbUser.role;
          await prisma.inquiry.updateMany({
            where: { guestEmail: dbUser.email, userId: null },
            data: { userId: dbUser.id, guestEmail: null },
          });
          await prisma.meeting.updateMany({
            where: { guestEmail: dbUser.email, userId: null },
            data: { userId: dbUser.id, guestEmail: null },
          });
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sub = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
      }

      if ((!token.firstName || !token.lastName || !token.role) && token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const tokenId =
          typeof token.sub === "string"
            ? token.sub
            : typeof token.id === "string"
              ? token.id
              : "";
        const tokenRole = typeof token.role === "string" ? token.role : "USER";
        const tokenFirstName =
          typeof token.firstName === "string" ? token.firstName : "User";
        const tokenLastName =
          typeof token.lastName === "string" ? token.lastName : "";
        session.user.id = tokenId;
        session.user.role = tokenRole;
        session.user.firstName = tokenFirstName;
        session.user.lastName = tokenLastName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
