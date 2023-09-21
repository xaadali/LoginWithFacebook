import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET_ID as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: process.env.AUTHORIZATION_URL as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { token } = credentials;
        if (token) {
          return credentials;
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
    // maxAge: 90 * 24 * 60 * 60 , //expires after 90 days
    maxAge: 24 * 60 * 60, //expires after 1 minute
  },
  jwt: {},
  callbacks: {
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  // secret: process.env.JWT_SECRET
};
export default NextAuth(authOptions);
