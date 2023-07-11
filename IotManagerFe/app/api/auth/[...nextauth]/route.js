import { login } from "@/fetchData/backendToApi/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  secret: "say_lalisa_love_me_lalisa_love_me_hey",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "email@domain.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const data = await login(credentials);
        if (data.status !== 200) return null;
        return { token: data.token, username: data.username };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
