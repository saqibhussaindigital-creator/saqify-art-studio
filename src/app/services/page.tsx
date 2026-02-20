'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPaintBrush, FaPencilAlt, FaQuran, FaGift, FaBuilding, FaPalette, FaLaptop, FaStore } from 'react-icons/fa';

const services = [
  {
    name: 'Custom Art Services',
    description: 'Personalized artwork tailored to your vision. Whether it\'s a portrait, landscape, or abstract piece, we bring your ideas to life.',
    subcategories: ['Portraits', 'Landscapes', 'Abstract Art'],
    price: 'From $150',
    icon: <FaPencilAlt />,
  },
  {
    name: 'Islamic Art and Calligraphy',
    description: 'Stunning Islamic art pieces including Quranic verses and beautiful calligraphy. Perfect for home or office.',
    subcategories: ['Quranic Verses', 'Names of Allah', 'Modern Calligraphy'],
    price: 'From $200',
    icon: <FaQuran />,
  },
  {
    name: 'Gifts And Bouquets',
    description: 'Thoughtful gift options including handmade cards, custom mugs, and beautiful flower arrangements.',
    subcategories: ['Handmade Cards', 'Custom Mugs', 'Flower Arrangements'],
    price: 'From $50',
    icon: <FaGift />,
  },
  {
    name: 'Event & Corporate Services',
    description: 'Live painting, caricatures, and custom murals for events, weddings, and corporate offices.',
    subcategories: ['Live Painting', 'Caricatures', 'Office Murals'],
    price: 'From $300',
    icon: <FaBuilding />,
  },
  {
    name: 'Digital Art Services',
    description: 'Professional digital illustrations, logos, and NFT designs for your brand or collection.',
    subcategories: ['Illustrations', 'Logos', 'NFTs'],
    price: 'From $100',
    icon: <FaLaptop />,
  },
  {
    name: 'Art Materials And Supplies',
    description: 'High-quality art supplies including premium canvases, paints, and professional brushes.',
    subcategories: ['Canvases', 'Paints', 'Brushes'],
    price: 'Varies',
    icon: <FaStore />,
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
    <div className="bg-primary-charcoal min-h-screen text-accent-ivory">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-4 relative overflow-hidden"
      >
        <motion.div
          className="absolute top-10 left-1/2 w-96 h-96 bg-secondary-gold/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 -translate-x-1/2"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-secondary-gold to-secondary-warm relative z-10">
          Our Services
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-accent-beige mb-0 max-w-2xl mx-auto text-lg relative z-10"
        >
          Discover our wide range of art services designed to meet all your creative needs
        </motion.p>
      </motion.div>

      <div className="container mx-auto px-4 py-12 pb-24">
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
              whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(201, 162, 77, 0.1)' }}
              className="bg-primary-deep rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-secondary-gold/20 hover:border-secondary-gold group flex flex-col"
            >
              {/* Top gradient bar */}
              <div className="h-2 bg-gradient-to-r from-secondary-gold to-secondary-warm"></div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="text-3xl text-secondary-gold"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {service.icon}
                  </motion.div>
                  <p className="text-xl font-bold font-serif text-secondary-warm">
                    {service.price}
                  </p>
                </div>

                <motion.h2
                  className="text-2xl font-serif font-bold mb-3 text-accent-ivory group-hover:text-secondary-gold transition-colors"
                >
                  {service.name}
                </motion.h2>

                <p className="text-accent-beige mb-6 leading-relaxed flex-grow">{service.description}</p>

                <div className="mb-6">
                  <h3 className="text-xs font-bold text-secondary-gold mb-3 uppercase tracking-wider">Includes:</h3>
                  <ul className="space-y-2">
                    {service.subcategories.map((sub) => (
                      <motion.li
                        key={sub}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center text-accent-beige text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-gold mr-3"></span>
                        {sub}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
                  <Link
                    href="/order"
                    className="block text-center bg-secondary-gold text-black hover:bg-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
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
        className="py-20 px-4 bg-primary-deep border-t border-secondary-gold/20"
      >
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold mb-6 text-secondary-gold"
          >
            Don&apos;t see what you&apos;re looking for?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-accent-beige mb-8 text-lg max-w-2xl mx-auto"
          >
            Contact us for custom packages and special requests
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-secondary-gold text-secondary-gold font-bold py-3 px-10 rounded-full hover:bg-secondary-gold hover:text-primary-deep transition duration-300 shadow-lg hover:shadow-2xl"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
