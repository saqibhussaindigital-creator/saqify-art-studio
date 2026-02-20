'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-secondary-gold/20 text-secondary-gold hover:bg-secondary-gold hover:text-primary-deep transition-all duration-300 ml-4 border border-secondary-gold/50"
            aria-label="Toggle Dark Mode"
        >
            {currentTheme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
        </motion.button>
    );
}
