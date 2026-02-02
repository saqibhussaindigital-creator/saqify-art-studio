'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      className="bg-primary-deep/95 text-accent-ivory p-4 sticky top-0 z-50 shadow-2xl border-b border-secondary-gold/20 backdrop-blur-md"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className=""
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
            <img src="/logo.png" alt="Saqify Art Studio" className="h-12 w-auto object-contain" />
            <span className="text-2xl font-serif font-bold text-secondary-gold">
              Saqify Art Studio
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <motion.ul
            className="flex space-x-1"
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

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </motion.button>
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
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
}
