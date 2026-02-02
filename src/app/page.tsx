'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPaintBrush, FaPencilAlt, FaQuran, FaGift, FaBuilding, FaPalette, FaLaptop, FaStore } from 'react-icons/fa';

export default function Home() {
  const services = [
    {
      title: "Sketching & Portraits",
      description: "Hand-drawn pencil and charcoal sketches crafted from your photos, perfect for gifts and memories.",
      icon: <FaPencilAlt />,
    },
    {
      title: "Paintings",
      description: "Acrylic, oil, and mixed media paintings on canvas with premium finishing.",
      icon: <FaPaintBrush />,
    },
    {
      title: "Islamic Calligraphy",
      description: "Traditional and modern Islamic calligraphy designed with spiritual elegance.",
      icon: <FaQuran />,
    },
    {
      title: "Personalized Gifts",
      description: "Emotion-driven custom gifts for birthdays, anniversaries, and special occasions.",
      icon: <FaGift />,
    },
    {
      title: "Wall Art & Murals",
      description: "Indoor and outdoor wall painting, chalk art, and murals for homes and businesses.",
      icon: <FaBuilding />,
    },
    {
      title: "Commercial Art",
      description: "Creative artwork and branding visuals for businesses, cafes, and offices.",
      icon: <FaPalette />,
    },
    {
      title: "Digital Art & Design",
      description: "High-quality digital portraits, posters, and social media designs.",
      icon: <FaLaptop />,
    },
    {
      title: "Art Supplies",
      description: "Curated art materials for students and professionals.",
      icon: <FaStore />,
    }
  ];

  const testimonials = [
    {
      name: 'Maria Johnson',
      role: 'Client',
      text: 'The custom portrait they created for my family is absolutely stunning. Professional, creative, and exceeded all expectations!',
      rating: '⭐⭐⭐⭐⭐',
    },
    {
      name: 'Hassan Ali',
      role: 'Business Owner',
      text: 'Saqify designed the perfect logo for my startup. They understood my vision and delivered something even better than imagined.',
      rating: '⭐⭐⭐⭐⭐',
    },
    {
      name: 'Aisha Khan',
      role: 'Event Planner',
      text: 'The live painting at our wedding was incredible! Guests loved it, and the final artwork is a beautiful memory of our special day.',
      rating: '⭐⭐⭐⭐⭐',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 50 },
    },
  };

  return (
    <div className="bg-primary-charcoal font-sans text-accent-ivory">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/hero-collage.png')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/90 via-primary-charcoal/80 to-primary-charcoal"></div>
        </div>

        {/* Floating Glows */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-gold/20 rounded-full blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-secondary-gold to-secondary-warm tracking-tight">
              Saqify Art Studio
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-accent-beige/90 tracking-wide mt-4 italic">
              Where Art Meets Emotion
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Custom sketches, paintings, calligraphy, gifts, and complete creative services for local and global clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/order"
              className="px-8 py-4 bg-secondary-gold text-primary-deep font-bold rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(201,162,77,0.5)] transition-all duration-300 text-lg w-full md:w-auto"
            >
              Place Your Order
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-4 bg-transparent border-2 border-secondary-gold text-secondary-gold font-bold rounded-full hover:bg-secondary-gold/10 transition-all duration-300 text-lg w-full md:w-auto"
            >
              View Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 bg-primary-deep relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary-gold mb-4">Our Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Discover the wide range of artistic services we offer.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary-gold/50 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <div className="text-4xl text-secondary-gold mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent-ivory">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-b from-primary-deep to-primary-charcoal">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-gold to-secondary-warm mb-4">Client Love</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-primary-charcoal border border-secondary-gold/20 shadow-xl relative"
              >
                <div className="absolute top-6 right-8 text-4xl text-secondary-gold/20 font-serif">"</div>
                <div className="text-secondary-gold mb-4 text-sm tracking-widest">{t.rating}</div>
                <p className="text-gray-300 italic mb-6 leading-relaxed relative z-10">{t.text}</p>
                <div>
                  <h4 className="font-bold text-accent-ivory">{t.name}</h4>
                  <p className="text-secondary-gold text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary-gold/10"></div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-5"></div>

        <div className="container mx-auto text-center relative z-10 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Let’s Create Your Next Masterpiece
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-10"
          >
            Whether it's a portrait, a mural, or a digital design, we bring your vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="https://wa.me/923478025660"
              target="_blank"
              className="px-10 py-4 bg-transparent border-2 border-secondary-gold text-secondary-gold font-bold rounded-full hover:bg-secondary-gold hover:text-primary-deep transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>WhatsApp Us</span>
            </Link>
            <Link
              href="/order"
              className="px-10 py-4 bg-secondary-gold text-primary-deep font-bold rounded-full hover:bg-white transition-all shadow-lg"
            >
              Start Your Order
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

