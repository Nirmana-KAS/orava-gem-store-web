import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendSignInGreetingEmail } from "@/lib/resend";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) {
          throw new Error("Invalid credentials");
        }
        const { email, password } = parsed.data;
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
      try {
        if (!user.email) return true;
        const dbUser = await prisma.user.findUnique({ where: { email: user.email } });

        if (account?.provider === "google" && !dbUser) {
          const created = await prisma.user.create({
            data: {
              email: user.email,
              firstName: (user as { firstName?: string }).firstName ?? "User",
              lastName: (user as { lastName?: string }).lastName ?? "",
              image: user.image,
              role: Role.USER,
              emailVerified: new Date(),
            },
          });
          user.id = created.id;
        } else if (dbUser) {
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
        }
      } catch (error) {
        console.error("Sign in callback error:", error);
      }
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

