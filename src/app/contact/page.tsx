'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-charcoal min-h-screen text-accent-ivory">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-serif font-bold text-center py-16 text-transparent bg-clip-text bg-gradient-to-r from-secondary-gold to-secondary-warm"
      >
        Contact Us
      </motion.h1>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary-deep p-10 rounded-2xl shadow-xl border border-secondary-gold/20 hover:border-secondary-gold transition-all"
          >
            <h2 className="text-2xl font-serif font-bold mb-6 text-secondary-gold">Get In Touch</h2>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <a href="mailto:saqibhussaindigital@gmail.com" className="text-accent-beige hover:text-secondary-gold hover:underline text-lg transition-colors">
                saqibhussaindigital@gmail.com
              </a>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Phone</h3>
              <a href="whatsapp://send?phone=+923478025660" className="text-accent-beige hover:text-secondary-gold hover:underline text-lg transition-colors">
                +92 347 8025660
              </a>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Address</h3>
              <p className="text-accent-beige">
                Katlang Mardan<br />
                Khyber Pakhtunkhwa<br />
                Pakistan
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="https://www.instagram.com/curioussaqibartist/" target="_blank" rel="noopener noreferrer" className="text-accent-beige hover:text-pink-500 text-3xl transition-transform hover:scale-110">
                  <FaInstagram />
                </a>
                <a href="https://www.facebook.com/share/16sDXWzW9J/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 text-3xl transition-transform hover:scale-110">
                  <FaFacebook />
                </a>
                <a href="https://www.youtube.com/@curioussaqibartist" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 text-3xl transition-transform hover:scale-110">
                  <FaYoutube />
                </a>
                <a href="https://www.linkedin.com/in/curious-saqib-social-media-manger/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 text-3xl transition-transform hover:scale-110">
                  <FaLinkedin />
                </a>
                <a href="https://www.tiktok.com/@curioussaqibartist?_r=1&_t=ZS-925to32Ra6f&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnOAXeHbKIcN34YVu5MuKUGBgB4X_2MHMrUutofw4oUlG2CeJRdSBBNIp7PTw_aem_Ex1xvNYjZapNwe-007Bm-g" target="_blank" rel="noopener noreferrer" className="text-accent-beige hover:text-accent-ivory text-3xl transition-transform hover:scale-110">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary-deep p-10 rounded-2xl shadow-xl border border-secondary-gold/20 hover:border-secondary-gold transition-all"
          >
            <h2 className="text-2xl font-serif font-bold mb-6 text-secondary-gold">Send us a Message</h2>
            {submitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-900/50 border border-green-500 text-green-300 p-4 rounded mb-4"
              >
                ✓ Thank you! We&apos;ll get back to you soon.
              </motion.div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-secondary-gold font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 rounded bg-primary-charcoal border border-secondary-gold/20 focus:outline-none focus:border-secondary-gold text-accent-ivory"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-secondary-gold font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 rounded bg-primary-charcoal border border-secondary-gold/20 focus:outline-none focus:border-secondary-gold text-accent-ivory"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-secondary-gold font-bold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-3 rounded bg-primary-charcoal border border-secondary-gold/20 focus:outline-none focus:border-secondary-gold text-accent-ivory"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-secondary-gold font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full p-3 rounded bg-primary-charcoal border border-secondary-gold/20 focus:outline-none focus:border-secondary-gold text-accent-ivory"
                  required
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full bg-secondary-gold hover:bg-secondary-warm text-primary-deep font-bold py-3 px-4 rounded transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

