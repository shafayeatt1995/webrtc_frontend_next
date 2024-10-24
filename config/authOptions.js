import { apiSignin } from "@/lib/auth/auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: { signIn: "/signin", newUser: "/signup" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          return await apiSignin(credentials);
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const accessToken = token.token;

      session.user = { ...token.user, accessToken };
      return session;
    },
  },
};
