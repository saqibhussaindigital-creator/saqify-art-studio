'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
        >
            <a
                href="https://wa.me/923478025660"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-secondary-gold hover:bg-white text-primary-deep p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center w-16 h-16 border-2 border-secondary-gold hover:border-white group"
                title="Chat on WhatsApp"
            >
                <FaWhatsapp className="text-3xl group-hover:text-primary-deep transition-colors duration-300" />
            </a>
        </motion.div>
    );
}

