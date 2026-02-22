'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    FaUser, FaSignOutAlt, FaShoppingBag, FaHeart, FaClipboardList,
    FaCalendarAlt, FaEnvelope, FaTrash, FaGoogle, FaLock
} from 'react-icons/fa';

/* ─── Types ─────────────────────────────────────────────── */
interface Order {
    id: string;
    service: string;
    budget: string;
    details: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    createdAt: string;
}
interface WishlistItem {
    id: string;
    title: string;
    category: string;
    image: string;
    addedAt: string;
}

type Tab = 'overview' | 'orders' | 'wishlist' | 'settings';

const STATUS_COLORS: Record<Order['status'], string> = {
    pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    'in-progress': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    completed: 'text-green-400 bg-green-400/10 border-green-400/30',
    cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
};

/* ─── Helpers ────────────────────────────────────────────── */
function getOrders(email: string): Order[] {
    try {
        const raw = localStorage.getItem(`saqify_orders_${email}`);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}
function getWishlist(email: string): WishlistItem[] {
    try {
        const raw = localStorage.getItem(`saqify_wishlist_${email}`);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}
function saveWishlist(email: string, items: WishlistItem[]) {
    localStorage.setItem(`saqify_wishlist_${email}`, JSON.stringify(items));
}

/* ─── Component ─────────────────────────────────────────── */
export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [tab, setTab] = useState<Tab>('overview');
    const [orders, setOrders] = useState<Order[]>([]);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    useEffect(() => {
        if (status === 'unauthenticated') router.replace('/signin');
    }, [status, router]);

    useEffect(() => {
        if (session?.user?.email) {
            setOrders(getOrders(session.user.email));
            setWishlist(getWishlist(session.user.email));
        }
    }, [session]);

    const removeFromWishlist = (id: string) => {
        if (!session?.user?.email) return;
        const updated = wishlist.filter((w) => w.id !== id);
        setWishlist(updated);
        saveWishlist(session.user.email, updated);
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

    if (!session) return null;

    const user = session.user!;
    const initials = user.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : (user.email?.[0] ?? 'U').toUpperCase();

    const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
        { id: 'overview', label: 'Overview', icon: <FaUser /> },
        { id: 'orders', label: 'My Orders', icon: <FaShoppingBag />, count: orders.length },
        { id: 'wishlist', label: 'Wishlist', icon: <FaHeart />, count: wishlist.length },
        { id: 'settings', label: 'Settings', icon: <FaClipboardList /> },
    ];

    return (
        <div className="min-h-screen bg-primary-charcoal text-accent-ivory pb-20">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-br from-primary-deep via-primary-charcoal to-primary-deep border-b border-secondary-gold/10 overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "url('/hero-collage.png')", backgroundSize: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-gold/5 to-transparent" />
                <div className="relative z-10 container mx-auto px-4 py-14">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        {/* Avatar */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name ?? 'User'}
                                    className="w-24 h-24 rounded-full border-4 border-secondary-gold shadow-xl object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full border-4 border-secondary-gold bg-gradient-to-br from-secondary-gold to-secondary-warm flex items-center justify-center text-3xl font-bold text-primary-deep shadow-xl">
                                    {initials}
                                </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-primary-deep" />
                        </motion.div>

                        {/* Name + Email */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-center md:text-left"
                        >
                            <h1 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-gold to-secondary-warm">
                                {user.name ?? 'Art Lover'}
                            </h1>
                            <p className="text-accent-beige flex items-center justify-center md:justify-start gap-2 mt-1">
                                <FaEnvelope className="text-secondary-gold text-xs" />
                                {user.email}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                {(user as any).provider === 'google' ? (
                                    <span className="flex items-center gap-1.5 text-xs bg-white/10 px-3 py-1 rounded-full text-white/70">
                                        <FaGoogle className="text-red-400" /> Connected via Google
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 text-xs bg-white/10 px-3 py-1 rounded-full text-white/70">
                                        <FaLock className="text-secondary-gold" /> Email & Password
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {/* Sign Out */}
                        <div className="md:ml-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm font-semibold"
                            >
                                <FaSignOutAlt /> Sign Out
                            </motion.button>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-3 gap-4 mt-8 max-w-sm"
                    >
                        {[
                            { label: 'Orders', value: orders.length },
                            { label: 'Wishlist', value: wishlist.length },
                            { label: 'Member', value: '✦' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center">
                                <div className="text-2xl font-bold text-secondary-gold">{s.value}</div>
                                <div className="text-xs text-accent-beige mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                {/* Tab Navigation */}
                <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap text-sm transition-all duration-300 ${tab === t.id
                                    ? 'bg-secondary-gold text-primary-deep shadow-lg shadow-secondary-gold/20'
                                    : 'bg-primary-deep border border-white/10 text-accent-beige hover:border-secondary-gold/40 hover:text-secondary-gold'
                                }`}
                        >
                            {t.icon}
                            {t.label}
                            {t.count !== undefined && t.count > 0 && (
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === t.id ? 'bg-primary-deep text-secondary-gold' : 'bg-secondary-gold/20 text-secondary-gold'}`}>
                                    {t.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                    >
                        {/* ── OVERVIEW ── */}
                        {tab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Quick Stats */}
                                <div className="bg-primary-deep border border-secondary-gold/20 rounded-2xl p-6">
                                    <h2 className="text-xl font-serif font-bold text-secondary-gold mb-4">Quick Summary</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                                            <span className="text-accent-beige flex items-center gap-2"><FaShoppingBag className="text-secondary-gold" /> Total Orders</span>
                                            <span className="font-bold text-accent-ivory">{orders.length}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                                            <span className="text-accent-beige flex items-center gap-2"><FaHeart className="text-red-400" /> Wishlisted Items</span>
                                            <span className="font-bold text-accent-ivory">{wishlist.length}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-accent-beige flex items-center gap-2"><FaCalendarAlt className="text-secondary-gold" /> Member Since</span>
                                            <span className="font-bold text-accent-ivory">{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Order */}
                                <div className="bg-primary-deep border border-secondary-gold/20 rounded-2xl p-6">
                                    <h2 className="text-xl font-serif font-bold text-secondary-gold mb-4">Recent Order</h2>
                                    {orders.length > 0 ? (
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-semibold text-accent-ivory">{orders[0].service}</p>
                                                    <p className="text-accent-beige text-sm mt-1">{orders[0].details.slice(0, 80)}...</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 mt-3">
                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[orders[0].status]}`}>
                                                    {orders[0].status.replace('-', ' ').toUpperCase()}
                                                </span>
                                                <span className="text-accent-beige text-xs">{new Date(orders[0].createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <FaShoppingBag className="text-4xl text-secondary-gold/30 mx-auto mb-3" />
                                            <p className="text-accent-beige text-sm">No orders yet</p>
                                            <Link href="/order" className="text-secondary-gold text-sm font-semibold hover:underline mt-2 inline-block">
                                                Place your first order →
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* CTA Banners */}
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Link href="/order">
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className="bg-gradient-to-r from-secondary-gold/20 to-secondary-warm/10 border border-secondary-gold/30 rounded-xl p-5 cursor-pointer hover:border-secondary-gold transition-all"
                                        >
                                            <FaShoppingBag className="text-secondary-gold text-2xl mb-2" />
                                            <h3 className="font-bold text-accent-ivory">Place New Order</h3>
                                            <p className="text-accent-beige text-sm mt-1">Commission a custom artwork</p>
                                        </motion.div>
                                    </Link>
                                    <Link href="/gallery">
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className="bg-gradient-to-r from-purple-900/20 to-purple-900/10 border border-purple-500/20 rounded-xl p-5 cursor-pointer hover:border-purple-500/40 transition-all"
                                        >
                                            <FaHeart className="text-red-400 text-2xl mb-2" />
                                            <h3 className="font-bold text-accent-ivory">Browse Gallery</h3>
                                            <p className="text-accent-beige text-sm mt-1">Add favourites to your wishlist</p>
                                        </motion.div>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* ── ORDERS ── */}
                        {tab === 'orders' && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-serif font-bold text-secondary-gold">Order History</h2>
                                    <Link href="/order">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-sm bg-secondary-gold text-primary-deep font-bold px-4 py-2 rounded-lg hover:bg-secondary-warm transition-all"
                                        >
                                            + New Order
                                        </motion.button>
                                    </Link>
                                </div>

                                {orders.length === 0 ? (
                                    <div className="bg-primary-deep border border-secondary-gold/20 rounded-2xl p-16 text-center">
                                        <FaShoppingBag className="text-5xl text-secondary-gold/30 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-accent-ivory mb-2">No orders yet</h3>
                                        <p className="text-accent-beige mb-6">Place your first order and track it here</p>
                                        <Link href="/order" className="inline-block bg-secondary-gold text-primary-deep font-bold px-8 py-3 rounded-xl hover:bg-secondary-warm transition-all">
                                            Browse Services
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order, i) => (
                                            <motion.div
                                                key={order.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.08 }}
                                                className="bg-primary-deep border border-secondary-gold/20 rounded-2xl p-5 hover:border-secondary-gold/50 transition-all"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="font-mono text-xs text-secondary-gold bg-secondary-gold/10 px-2.5 py-1 rounded-lg border border-secondary-gold/20">
                                                                {order.id}
                                                            </span>
                                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>
                                                                {order.status.replace('-', ' ').toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <h3 className="font-bold text-accent-ivory text-lg">{order.service}</h3>
                                                        {order.budget && <p className="text-secondary-gold text-sm font-medium mt-0.5">{order.budget}</p>}
                                                        <p className="text-accent-beige text-sm mt-2 line-clamp-2">{order.details}</p>
                                                    </div>
                                                    <div className="text-right text-xs text-accent-beige">
                                                        <FaCalendarAlt className="inline mr-1 text-secondary-gold" />
                                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                            day: 'numeric', month: 'short', year: 'numeric'
                                                        })}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── WISHLIST ── */}
                        {tab === 'wishlist' && (
                            <div>
                                <h2 className="text-xl font-serif font-bold text-secondary-gold mb-4">My Wishlist</h2>
                                {wishlist.length === 0 ? (
                                    <div className="bg-primary-deep border border-secondary-gold/20 rounded-2xl p-16 text-center">
                                        <FaHeart className="text-5xl text-red-400/30 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-accent-ivory mb-2">Wishlist is empty</h3>
                                        <p className="text-accent-beige mb-6">Browse the gallery and save your favourites</p>
                                        <Link href="/gallery" className="inline-block bg-secondary-gold text-primary-deep font-bold px-8 py-3 rounded-xl hover:bg-secondary-warm transition-all">
                                            Explore Gallery
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {wishlist.map((item, i) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.08 }}
                                                className="bg-primary-deep border border-secondary-gold/20 rounded-2xl overflow-hidden group hover:border-secondary-gold transition-all"
                                            >
                                                <div className="h-44 overflow-hidden relative">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <button
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </button>
                                                </div>
                                                <div className="p-4">
                                                    <span className="text-xs font-bold text-secondary-gold bg-secondary-gold/10 px-2.5 py-1 rounded-full border border-secondary-gold/20">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="font-bold text-accent-ivory mt-2">{item.title}</h3>
                                                    <div className="flex items-center justify-between mt-3">
                                                        <span className="text-accent-beige text-xs">
                                                            Added {new Date(item.addedAt).toLocaleDateString()}
                                                        </span>
                                                        <Link href="/order" className="text-xs font-bold text-secondary-gold hover:underline">
                                                            Order Now →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── SETTINGS ── */}
                        {tab === 'settings' && (
                            <div className="max-w-lg">
                                <h2 className="text-xl font-serif font-bold text-secondary-gold mb-4">Account Settings</h2>
                                <div className="space-y-4">
                                    <div className="bg-primary-deep border border-secondary-gold/20 rounded-2xl p-6 space-y-4">
                                        <h3 className="font-bold text-accent-ivory">Profile Info</h3>
                                        <div>
                                            <label className="block text-secondary-gold text-sm font-semibold mb-1.5">Display Name</label>
                                            <input
                                                type="text"
                                                defaultValue={user.name ?? ''}
                                                readOnly
                                                className="w-full p-3 rounded-xl bg-primary-charcoal border border-secondary-gold/20 text-accent-ivory/70 cursor-not-allowed"
                                            />
                                            <p className="text-accent-beige text-xs mt-1">Managed by {(user as any).provider === 'google' ? 'Google' : 'your account'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-secondary-gold text-sm font-semibold mb-1.5">Email Address</label>
                                            <input
                                                type="email"
                                                defaultValue={user.email ?? ''}
                                                readOnly
                                                className="w-full p-3 rounded-xl bg-primary-charcoal border border-secondary-gold/20 text-accent-ivory/70 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6">
                                        <h3 className="font-bold text-red-400 mb-2">Danger Zone</h3>
                                        <p className="text-accent-beige text-sm mb-4">Sign out from all devices and sessions</p>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all text-sm"
                                        >
                                            <FaSignOutAlt /> Sign Out
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
