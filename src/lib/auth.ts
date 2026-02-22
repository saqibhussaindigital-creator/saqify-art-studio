import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// In-memory user store for demo. Replace with DB adapter (Prisma/MongoDB) in production.
const users: Array<{ id: string; name: string; email: string; passwordHash: string; image?: string }> = [];

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Email & Password',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
                password: { label: 'Password', type: 'password' },
                name: { label: 'Name', type: 'text' },
                isRegister: { label: 'Register', type: 'text' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email.toLowerCase().trim();

                // Registration flow
                if (credentials.isRegister === 'true') {
                    const existing = users.find((u) => u.email === email);
                    if (existing) throw new Error('Email already registered. Please sign in.');
                    const passwordHash = await bcrypt.hash(credentials.password, 10);
                    const newUser = {
                        id: `local-${Date.now()}`,
                        name: credentials.name || email.split('@')[0],
                        email,
                        passwordHash,
                    };
                    users.push(newUser);
                    return { id: newUser.id, name: newUser.name, email: newUser.email };
                }

                // Login flow
                const user = users.find((u) => u.email === email);
                if (!user) throw new Error('No account found. Please register first.');
                const valid = await bcrypt.compare(credentials.password, user.passwordHash);
                if (!valid) throw new Error('Incorrect password.');
                return { id: user.id, name: user.name, email: user.email, image: user.image };
            },
        }),
    ],
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
        error: '/signin',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.provider = account?.provider ?? 'credentials';
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).provider = token.provider as string;
            }
            return session;
        },
    },
};
