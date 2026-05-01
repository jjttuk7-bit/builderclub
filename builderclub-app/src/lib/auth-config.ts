import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // For now, simple check - in production, hash passwords
        // Assume builders table has email and password_hash columns
        const { data: builder, error } = await supabase
          .from('builders')
          .select('*')
          .eq('email', email)
          .single();

        if (error || !builder) {
          return null;
        }

        // Simple password check - replace with proper hashing
        if (builder.password_hash === password) {
          return {
            id: builder.id,
            email: builder.email,
            name: builder.display_name,
            handle: builder.handle,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.handle = (user as any).handle;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).handle = token.handle;
      }
      return session;
    },
  },
});