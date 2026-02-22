'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import Link from 'next/link';

export default function SignInPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [mode, setMode] = useState<'signin' | 'register'>('signin');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [form, setForm] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        if (status === 'authenticated') router.replace('/profile');
    }, [status, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleCredentials = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const result = await signIn('credentials', {
            redirect: false,
            email: form.email,
            password: form.password,
            name: form.name,
            isRegister: mode === 'register' ? 'true' : 'false',
        });

        setLoading(false);

        if (result?.error) {
            setError(result.error);
        } else {
            setSuccess(mode === 'register' ? 'Account created! Redirecting...' : 'Welcome back! Redirecting...');
            setTimeout(() => router.replace('/profile'), 1200);
        }
    };

    const handleGoogle = () => {
        setLoading(true);
        signIn('google', { callbackUrl: '/profile' });
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-primary-charcoal flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-secondary-gold border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-charcoal flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Background glows */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-gold/10 rounded-full blur-[120px]"
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px]"
                animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Card */}
                <div className="bg-primary-deep border border-secondary-gold/20 rounded-3xl p-8 shadow-2xl">
                    {/* Logo / Brand */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block mb-4">
                            <img src="/logo.png" alt="Saqify Art Studio" className="h-14 w-auto mx-auto object-contain" />
                        </Link>
                        <h1 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-gold to-secondary-warm">
                            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-accent-beige mt-2 text-sm">
                            {mode === 'signin' ? 'Sign in to manage your orders & wishlist' : 'Join Saqify Art Studio today'}
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-primary-charcoal rounded-xl p-1 mb-6">
                        {(['signin', 'register'] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => { setMode(m); setError(null); setSuccess(null); }}
                                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${mode === m
                                        ? 'bg-secondary-gold text-primary-deep shadow-md'
                                        : 'text-accent-beige hover:text-secondary-gold'
                                    }`}
                            >
                                {m === 'signin' ? 'Sign In' : 'Register'}
                            </button>
                        ))}
                    </div>

                    {/* Google Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleGoogle}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 mb-5 shadow-md hover:shadow-lg disabled:opacity-50"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        Continue with Google
                    </motion.button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-secondary-gold/20" />
                        <span className="text-accent-beige text-xs font-medium">or with email</span>
                        <div className="flex-1 h-px bg-secondary-gold/20" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleCredentials} className="space-y-4">
                        <AnimatePresence>
                            {mode === 'register' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <label className="block text-secondary-gold font-semibold mb-1.5 text-sm">Full Name</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent-beige/60 text-sm" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Saqib Hussain"
                                            required={mode === 'register'}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-primary-charcoal border border-secondary-gold/20 focus:border-secondary-gold focus:outline-none focus:ring-1 focus:ring-secondary-gold text-accent-ivory placeholder-accent-beige/40 transition-all"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-secondary-gold font-semibold mb-1.5 text-sm">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent-beige/60 text-sm" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-primary-charcoal border border-secondary-gold/20 focus:border-secondary-gold focus:outline-none focus:ring-1 focus:ring-secondary-gold text-accent-ivory placeholder-accent-beige/40 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-secondary-gold font-semibold mb-1.5 text-sm">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent-beige/60 text-sm" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-primary-charcoal border border-secondary-gold/20 focus:border-secondary-gold focus:outline-none focus:ring-1 focus:ring-secondary-gold text-accent-ivory placeholder-accent-beige/40 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-accent-beige/60 hover:text-secondary-gold transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Error / Success */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm"
                                >
                                    ⚠️ {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-green-900/30 border border-green-500/50 text-green-300 px-4 py-3 rounded-xl text-sm"
                                >
                                    ✓ {success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-secondary-gold to-secondary-warm text-primary-deep font-bold py-3.5 rounded-xl shadow-lg hover:shadow-secondary-gold/30 hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? '⏳ Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                        </motion.button>
                    </form>

                    <p className="text-center text-accent-beige/60 text-xs mt-6">
                        By continuing, you agree to our{' '}
                        <span className="text-secondary-gold cursor-pointer hover:underline">Terms</span> and{' '}
                        <span className="text-secondary-gold cursor-pointer hover:underline">Privacy Policy</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
