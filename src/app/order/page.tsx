'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Order() {
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
      phone: formData.get('phone'),
      service: formData.get('service'),
      budget: formData.get('budget'),
      details: formData.get('details'),
    };

    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        // If validation details exist, format them (optional simple approach for now)
        if (resData.details) {
          const details = Object.values(resData.details).flat().join(', ');
          throw new Error(details || resData.error || 'Validation failed');
        }
        throw new Error(resData.error || 'Something went wrong. Please try again.');
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

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 min-h-screen py-16">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
      >
        Place an Order
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-gray-300 max-w-2xl mx-auto mb-12 text-lg"
      >
        Tell us about your project and let&apos;s create something amazing together
      </motion.p>

      <div className="container mx-auto max-w-2xl px-4">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-900 to-emerald-900 border-2 border-green-500 p-12 rounded-2xl text-center shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="text-6xl mb-6 inline-block"
            >
              ✓
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-white">Thank you for your order!</h2>
            <p className="text-green-100 text-lg leading-relaxed">
              We have received your request and will get back to you shortly with payment and delivery details.
              Check your email for confirmation.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-slate-800 to-slate-900 p-10 rounded-2xl shadow-2xl border border-gray-700"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-900 border-2 border-red-500 text-red-100 p-4 rounded-lg mb-6"
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* Name */}
            <motion.div
              custom={0}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <label htmlFor="name" className="block text-white font-bold mb-3 text-lg">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-4 rounded-lg bg-slate-700 border-2 border-gray-600 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Your full name"
                required
              />
            </motion.div>

            {/* Email */}
            <motion.div
              custom={1}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <label htmlFor="email" className="block text-white font-bold mb-3 text-lg">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 rounded-lg bg-slate-700 border-2 border-gray-600 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                placeholder="your@email.com"
                required
              />
            </motion.div>

            {/* Phone */}
            <motion.div
              custom={2}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <label htmlFor="phone" className="block text-white font-bold mb-3 text-lg">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-4 rounded-lg bg-slate-700 border-2 border-gray-600 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                placeholder="+1 (234) 567-890"
              />
            </motion.div>

            {/* Service */}
            <motion.div
              custom={3}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <label htmlFor="service" className="block text-white font-bold mb-3 text-lg">
                Service Type *
              </label>
              <select
                id="service"
                name="service"
                className="w-full p-4 rounded-lg bg-slate-700 border-2 border-gray-600 focus:border-purple-500 focus:outline-none text-white transition-all duration-300"
                required
              >
                <option value="">Select a service</option>
                <option value="Custom Art Services">Custom Art Services</option>
                <option value="Islamic Art and Calligraphy">Islamic Art and Calligraphy</option>
                <option value="Gifts And Bouquets">Gifts And Bouquets</option>
                <option value="Event & Corporate Services">Event & Corporate Services</option>
                <option value="Digital Art Services">Digital Art Services</option>
                <option value="Art Materials And Supplies">Art Materials And Supplies</option>
              </select>
            </motion.div>

            {/* Budget */}
            <motion.div
              custom={4}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <label htmlFor="budget" className="block text-white font-bold mb-3 text-lg">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                className="w-full p-4 rounded-lg bg-slate-700 border-2 border-gray-600 focus:border-purple-500 focus:outline-none text-white transition-all duration-300"
              >
                <option value="">Select your budget</option>
                <option value="Under $50">Under $50</option>
                <option value="$50 - $150">$50 - $150</option>
                <option value="$150 - $300">$150 - $300</option>
                <option value="$300 - $500">$300 - $500</option>
                <option value="$500+">$500+</option>
              </select>
            </motion.div>

            {/* Details */}
            <motion.div
              custom={5}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <label htmlFor="details" className="block text-white font-bold mb-3 text-lg">
                Project Details *
              </label>
              <textarea
                id="details"
                name="details"
                rows={6}
                className="w-full p-4 rounded-lg bg-slate-700 border-2 border-gray-600 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-300 resize-none"
                placeholder="Describe your project, vision, colors, style, deadlines, and any special requirements..."
                required
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              custom={6}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl text-lg"
              >
                {loading ? '⏳ Submitting...' : '📤 Submit Order'}
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
