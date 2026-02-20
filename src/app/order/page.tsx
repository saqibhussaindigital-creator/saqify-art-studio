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
    <div className="bg-primary-charcoal min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-secondary-gold to-secondary-warm"
        >
          Place an Order
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-accent-beige max-w-2xl mx-auto mb-12 text-lg"
        >
          Tell us about your project and let&apos;s create something amazing together.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-primary-deep border border-secondary-gold/30 p-12 rounded-2xl text-center shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="text-6xl mb-6 inline-block text-secondary-gold"
            >
              ✓
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-accent-ivory">Thank you for your order!</h2>
            <p className="text-accent-beige text-lg leading-relaxed">
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
            className="bg-primary-deep p-8 md:p-10 rounded-2xl shadow-2xl border border-secondary-gold/20"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6"
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
              <label htmlFor="name" className="block text-secondary-gold font-bold mb-3 text-lg">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-4 rounded-lg bg-primary-charcoal border border-secondary-gold/20 focus:border-secondary-gold focus:outline-none text-accent-ivory placeholder-accent-beige/50 transition-all duration-300 focus:ring-1 focus:ring-secondary-gold"
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
              <label htmlFor="email" className="block text-secondary-gold font-bold mb-3 text-lg">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 rounded-lg bg-primary-charcoal border border-secondary-gold/20 focus:border-secondary-gold focus:outline-none text-accent-ivory placeholder-accent-beige/50 transition-all duration-300 focus:ring-1 focus:ring-secondary-gold"
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
              <label htmlFor="phone" className="block text-secondary-gold font-bold mb-3 text-lg">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-4 rounded-lg bg-primary-charcoal border border-secondary-gold/20 focus:border-secondary-gold focus:outline-none text-accent-ivory placeholder-accent-beige/50 transition-all duration-300 focus:ring-1 focus:ring-secondary-gold"
                placeholder="+92 3XX XXXXXXX"
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
              <label htmlFor="service" className="block text-secondary-gold font-bold mb-3 text-lg">
                Service Type *
              </label>
              <select
                id="service"
                name="service"
                className="w-full p-4 rounded-lg bg-primary-charcoal border border-secondary-gold/20 focus:border-secondary-gold focus:outline-none text-accent-ivory transition-all duration-300 focus:ring-1 focus:ring-secondary-gold"
                required
              >
                <option value="">Select a service</option>
                <option value="Sketching & Portraits">Sketching & Portraits</option>
                <option value="Paintings (Oil/Acrylic)">Paintings (Oil/Acrylic)</option>
                <option value="Islamic Calligraphy">Islamic Calligraphy</option>
                <option value="Personalized Gifts & Bouquets">Personalized Gifts & Bouquets</option>
                <option value="Wall Art & Murals">Wall Art & Murals</option>
                <option value="Commercial Art & Branding">Commercial Art & Branding</option>
                <option value="Digital Art & Design">Digital Art & Design</option>
                <option value="Art Supplies">Art Supplies</option>
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
              <label htmlFor="budget" className="block text-secondary-gold font-bold mb-3 text-lg">
                Budget Range (PKR/USD)
              </label>
              <select
                id="budget"
                name="budget"
                className="w-full p-4 rounded-lg bg-primary-charcoal border border-secondary-gold/20 focus:border-secondary-gold focus:outline-none text-accent-ivory transition-all duration-300 focus:ring-1 focus:ring-secondary-gold"
              >
                <option value="">Select your budget</option>
                <option value="Under 5,000 PKR ($20)">Under 5,000 PKR ($20)</option>
                <option value="5,000 - 15,000 PKR ($20-$50)">5,000 - 15,000 PKR ($20-$50)</option>
                <option value="15,000 - 30,000 PKR ($50-$100)">15,000 - 30,000 PKR ($50-$100)</option>
                <option value="30,000 - 60,000 PKR ($100-$200)">30,000 - 60,000 PKR ($100-$200)</option>
                <option value="60,000+ PKR ($200+)">60,000+ PKR ($200+)</option>
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
              <label htmlFor="details" className="block text-secondary-gold font-bold mb-3 text-lg">
                Project Details *
              </label>
              <textarea
                id="details"
                name="details"
                rows={6}
                className="w-full p-4 rounded-lg bg-primary-charcoal border border-secondary-gold/20 focus:border-secondary-gold focus:outline-none text-accent-ivory placeholder-accent-beige/50 transition-all duration-300 resize-none focus:ring-1 focus:ring-secondary-gold"
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
                className="w-full bg-secondary-gold text-primary-deep font-bold py-4 px-8 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:bg-white text-lg"
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

