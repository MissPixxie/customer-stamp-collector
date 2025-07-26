import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "stampCollector/server/db";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Användarnamn", type: "text" },
        password: { label: "Lösenord", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );
        if (!isValid) return null;

        return { id: user.id, username: user.username };
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
