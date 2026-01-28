'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    name: 'Custom Art Services',
    description: 'Personalized artwork tailored to your vision. Whether it\'s a portrait, landscape, or abstract piece, we bring your ideas to life.',
    subcategories: ['Portraits', 'Landscapes', 'Abstract Art'],
    price: 'From $150',
    gradient: 'from-purple-400 to-pink-600',
    bgGradient: 'from-purple-900 to-purple-800',
  },
  {
    name: 'Islamic Art and Calligraphy',
    description: 'Stunning Islamic art pieces including Quranic verses and beautiful calligraphy. Perfect for home or office.',
    subcategories: ['Quranic Verses', 'Names of Allah', 'Modern Calligraphy'],
    price: 'From $200',
    gradient: 'from-blue-400 to-green-500',
    bgGradient: 'from-blue-900 to-blue-800',
  },
  {
    name: 'Gifts And Bouquets',
    description: 'Thoughtful gift options including handmade cards, custom mugs, and beautiful flower arrangements.',
    subcategories: ['Handmade Cards', 'Custom Mugs', 'Flower Arrangements'],
    price: 'From $50',
    gradient: 'from-pink-400 to-red-500',
    bgGradient: 'from-pink-900 to-pink-800',
  },
  {
    name: 'Event & Corporate Services',
    description: 'Live painting, caricatures, and custom murals for events, weddings, and corporate offices.',
    subcategories: ['Live Painting', 'Caricatures', 'Office Murals'],
    price: 'From $300',
    gradient: 'from-yellow-400 to-orange-500',
    bgGradient: 'from-yellow-900 to-yellow-800',
  },
  {
    name: 'Digital Art Services',
    description: 'Professional digital illustrations, logos, and NFT designs for your brand or collection.',
    subcategories: ['Illustrations', 'Logos', 'NFTs'],
    price: 'From $100',
    gradient: 'from-indigo-400 to-purple-500',
    bgGradient: 'from-indigo-900 to-indigo-800',
  },
  {
    name: 'Art Materials And Supplies',
    description: 'High-quality art supplies including premium canvases, paints, and professional brushes.',
    subcategories: ['Canvases', 'Paints', 'Brushes'],
    price: 'Varies',
    gradient: 'from-green-400 to-teal-500',
    bgGradient: 'from-green-900 to-green-800',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

export default function Services() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-4 relative"
      >
        <motion.div
          className="absolute top-10 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-1/2"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 relative z-10">
          Our Services
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 mb-0 max-w-2xl mx-auto text-lg relative z-10"
        >
          Discover our wide range of art services designed to meet all your creative needs
        </motion.p>
      </motion.div>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              custom={i}
              variants={cardVariants}
              whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(147, 51, 234, 0.4)' }}
              className={`bg-gradient-to-br ${service.bgGradient} rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-purple-500 group`}
            >
              {/* Top gradient bar */}
              <div className={`h-3 bg-gradient-to-r ${service.gradient}`}></div>

              <div className="p-8">
                <motion.h2
                  className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all"
                >
                  {service.name}
                </motion.h2>

                <p className={`text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${service.gradient}`}>
                  {service.price}
                </p>

                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-400 mb-3">INCLUDES:</h3>
                  <ul className="space-y-2">
                    {service.subcategories.map((sub) => (
                      <motion.li
                        key={sub}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center text-gray-300 text-sm"
                      >
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}></span>
                        {sub}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/order"
                    className={`block text-center bg-gradient-to-r ${service.gradient} hover:shadow-lg text-white font-bold py-3 px-4 rounded-lg transition-all duration-300`}
                  >
                    Book Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 mt-16"
      >
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Don&apos;t see what you&apos;re looking for?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto"
          >
            Contact us for custom packages and special requests
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="inline-block bg-white text-purple-900 font-bold py-3 px-10 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-2xl"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
