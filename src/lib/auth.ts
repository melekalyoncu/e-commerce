import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

import { verifyUser, MockUser } from "@/lib/mock-users";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("MissingCredentials");
        }

        const user = await verifyUser(credentials.email, credentials.password);

        if (!user) {
          throw new Error("Kayıtlı kullanıcı bulunamadı veya şifre hatalı");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    // Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Facebook
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as MockUser;
        token.name = u.name;
        token.email = u.email;
        (token as Record<string, unknown>).picture = u.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string | undefined;
        session.user.email = token.email as string | undefined;
        const picture = (token as Record<string, unknown>).picture as string | undefined;
        if (picture) session.user.image = picture;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
