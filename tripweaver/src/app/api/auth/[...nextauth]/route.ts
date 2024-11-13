import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrUsername: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials?.emailOrUsername || "");
        const user = await User.findOne(
          isEmail ? { email: credentials?.emailOrUsername } : { username: credentials?.emailOrUsername }
        );

        if (user && user.password) {
          const isValidPassword = await bcrypt.compare(credentials!.password, user.password);
          if (isValidPassword) {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              name: user.displayName,
            };
          }
        }
        throw new Error("Invalid username/email or password");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectMongoDB();

      if (account?.provider === "google") {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const username = user.email

          existingUser = await User.create({
            googleId: account.id,
            username,
            email: user.email,
            displayName: user.name,
            imgPath: user.image,
          });
        }
        return true;
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.sub as string;
        (session.user as { id: string; name: string; username: string }).username = token.username as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as { id: string; username: string }).username;
      }
      return token;
    },
  },
  session: { strategy: "jwt" as SessionStrategy },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

