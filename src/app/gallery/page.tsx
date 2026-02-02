'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const portfolioItems = [
    { title: 'Royal Portrait', category: 'Custom Art Services', description: 'Beautiful detailed portrait of a royal family', image: '/gallery/portraite.jfif' },
    { title: 'Islamic Calligraphy', category: 'Islamic Art', description: 'Quranic verse in traditional Arabic calligraphy', image: '/gallery/islamic calligraphy.jfif' },
    { title: 'Mountain Landscape', category: 'Custom Art Services', description: 'Serene mountain landscape with watercolor technique', image: '/gallery/Landscape.jfif' },
    { title: 'Abstract Modern Art', category: 'Custom Art Services', description: 'Contemporary abstract piece with vibrant colors', image: '/gallery/abstract.jfif' },
    { title: 'Digital Logo Design', category: 'Digital Art Services', description: 'Professional brand logo with modern aesthetics', image: '/gallery/Digital logo.jfif' },
    { title: 'Wedding Caricatures', category: 'Event Services', description: 'Fun caricature drawings for wedding events', image: '/gallery/wedding.jfif' },
    { title: 'Custom Mug Design', category: 'Gifts & Bouquets', description: 'Personalized ceramic mug with custom artwork', image: '/gallery/custom mug.jfif' },
    { title: 'Corporate Mural', category: 'Event Services', description: 'Large-scale office wall mural with company branding', image: '/gallery/corporate.jfif' },
    { title: 'Custom Sketches', category: 'Custom Sketches', description: 'Unique Hand Drawn realistic sketches', image: '/gallery/realistic sketch.jfif' },
  ];

  const categories = ['All', 'Custom Art Services', 'Islamic Art', 'Digital Art Services', 'Event Services', 'Gifts & Bouquets', 'Custom Sketches'];

  const filteredItems = selectedCategory === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="bg-primary-charcoal min-h-screen text-accent-ivory">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-4 relative"
      >
        <motion.div
          className="absolute top-10 left-1/2 w-96 h-96 bg-secondary-gold/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-secondary-gold to-secondary-warm relative z-10">
          Our Portfolio
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 max-w-2xl mx-auto text-lg relative z-10"
        >
          Explore our latest creations and see the amazing work we&apos;ve done for our clients
        </motion.p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 px-4 py-12 container mx-auto"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border ${selectedCategory === category
              ? 'bg-secondary-gold text-primary-deep border-secondary-gold shadow-lg'
              : 'bg-primary-deep text-gray-400 border-gray-700 hover:border-secondary-gold hover:text-secondary-gold'
              }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={`${item.title}-${i}`}
              variants={itemVariants}
              whileHover={{ y: -15 }}
              className="bg-primary-deep rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-secondary-gold cursor-pointer group"
            >
              {/* Image/Icon Area */}
              <div className="relative h-56 bg-primary-charcoal flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.category} by Saqify Art Studio`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block text-xs font-bold text-secondary-gold bg-secondary-gold/10 px-3 py-1 rounded-full mb-3 border border-secondary-gold/20">
                  {item.category}
                </span>
                <motion.h3
                  className="text-xl font-bold mb-2 text-accent-ivory group-hover:text-secondary-gold transition-colors"
                >
                  {item.title}
                </motion.h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No items found in this category</p>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-12 text-center bg-primary-deep border border-secondary-gold/20 p-12 rounded-2xl shadow-2xl container mx-auto mx-4 mb-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-secondary-gold/5"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-4 text-accent-ivory">Inspired by Our Work?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s collaborate and create something amazing together. Get in touch with us to discuss your next project.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/order"
              className="inline-block bg-secondary-gold text-primary-deep font-bold py-3 px-10 rounded-full hover:bg-white transition duration-300 shadow-lg hover:shadow-2xl"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

