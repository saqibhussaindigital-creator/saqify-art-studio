'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import { FaUser, FaSignOutAlt, FaShoppingBag, FaHeart } from 'react-icons/fa';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Order', href: '/order' },
    { label: 'Contact', href: '/contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const user = session?.user;
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : (user?.email?.[0] ?? 'U').toUpperCase();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      className="bg-primary-deep/95 text-accent-ivory p-4 sticky top-0 z-50 shadow-2xl border-b border-secondary-gold/20 backdrop-blur-md"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
            <img src="/logo.png" alt="Saqify Art Studio" className="h-12 w-auto object-contain" />
            <span className="text-2xl font-serif font-bold text-secondary-gold">Saqify Art Studio</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <nav>
            <motion.ul
              className="flex space-x-1 items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.li key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-lg text-accent-ivory hover:text-secondary-gold hover:bg-white/5 transition-all duration-300 font-medium font-sans"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <ThemeToggle />

          {/* User Area */}
          <div className="relative ml-2" ref={userMenuRef}>
            {status === 'loading' ? (
              <div className="w-9 h-9 rounded-full bg-secondary-gold/20 animate-pulse" />
            ) : session ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full border-2 border-secondary-gold/40 hover:border-secondary-gold transition-all p-0.5"
                >
                  {user?.image ? (
                    <img src={user.image} alt={user.name ?? ''} className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary-gold to-secondary-warm flex items-center justify-center text-primary-deep font-bold text-sm">
                      {initials}
                    </div>
                  )}
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 w-52 bg-primary-deep border border-secondary-gold/20 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-secondary-gold/10">
                        <p className="font-bold text-accent-ivory truncate">{user?.name ?? 'User'}</p>
                        <p className="text-accent-beige text-xs truncate">{user?.email}</p>
                      </div>
                      {/* Menu Items */}
                      {[
                        { icon: <FaUser className="text-secondary-gold" />, label: 'My Profile', href: '/profile' },
                        { icon: <FaShoppingBag className="text-secondary-gold" />, label: 'My Orders', href: '/profile' },
                        { icon: <FaHeart className="text-red-400" />, label: 'Wishlist', href: '/profile' },
                      ].map((m) => (
                        <Link
                          key={m.href + m.label}
                          href={m.href}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-accent-beige hover:text-accent-ivory transition-all text-sm"
                        >
                          {m.icon} {m.label}
                        </Link>
                      ))}
                      <div className="border-t border-secondary-gold/10">
                        <button
                          onClick={() => { setIsUserMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all text-sm w-full"
                        >
                          <FaSignOutAlt /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link href="/signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary-gold text-primary-deep font-bold text-sm hover:bg-secondary-warm transition-all shadow-md"
                >
                  <FaUser className="text-xs" /> Sign In
                </motion.button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile: Theme + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          {/* Mobile user avatar */}
          {session && (
            <Link href="/profile">
              {user?.image ? (
                <img src={user.image} alt="" className="w-8 h-8 rounded-full border-2 border-secondary-gold object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-gold to-secondary-warm flex items-center justify-center text-primary-deep font-bold text-xs">
                  {initials}
                </div>
              )}
            </Link>
          )}
          {!session && (
            <Link href="/signin" className="text-secondary-gold text-sm font-bold">Login</Link>
          )}
          <motion.button
            className="text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4 bg-primary-charcoal rounded-xl p-4 border border-secondary-gold/20 shadow-xl"
        >
          <ul className="space-y-3">
            {navItems.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="block px-4 py-2 rounded-lg hover:bg-white/5 transition-colors font-medium text-accent-ivory hover:text-secondary-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
            {session && (
              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.05 }}>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-400 font-medium transition-colors"
                >
                  Sign Out
                </button>
              </motion.li>
            )}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
}
