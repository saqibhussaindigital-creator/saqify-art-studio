'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
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

  const features = [
    { icon: '🎨', title: 'Custom Designs', description: 'Personalized artwork tailored to your vision' },
    { icon: '⚡', title: 'Fast Delivery', description: 'Quick turnaround without compromising quality' },
    { icon: '🌟', title: 'Premium Quality', description: 'High-quality materials and expert craftsmanship' },
    { icon: '🤝', title: 'Great Support', description: 'Dedicated team to help throughout your project' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div>
      {/* Hero Section with Enhanced Background */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('/hero-collage.png')" }}></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90"></div>

        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 relative z-10"
        >
          Welcome to Saqify Art Studio
        </motion.h1>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="mb-6"
        >
          <img src="/logo.png" alt="Saqify Art Studio Logo" className="h-32 w-auto drop-shadow-2xl" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 max-w-2xl text-gray-200 relative z-10 leading-relaxed"
        >
          Where creativity comes to life. We offer a wide range of art services to bring your vision into reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
          className="flex gap-4 flex-wrap justify-center relative z-10"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/services"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-2xl inline-block"
            >
              Explore Our Services
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/gallery"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-2xl inline-block"
            >
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          >
            Why Choose Saqify?
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)' }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl text-center hover:shadow-2xl transition-all duration-300 border border-purple-500 border-opacity-20"
              >
                <motion.div
                  className="text-6xl mb-4 inline-block"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 via-purple-900 to-slate-950">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
          >
            What Our Clients Say
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={`${testimonial.name}-${i}`}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3)' }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-500 border-opacity-20"
              >
                <motion.div
                  className="text-yellow-400 mb-4 text-2xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {testimonial.rating}
                </motion.div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{testimonial.name}</p>
                  <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '500+', label: 'Happy Clients' },
              { number: '1000+', label: 'Projects Completed' },
              { number: '10+', label: 'Years Experience' },
              { number: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <motion.div
                  className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                  whileInView={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-400 mt-2 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-extrabold mb-6"
          >
            Ready to Create Something Amazing?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Let&apos;s bring your creative vision to life. Get started with Saqify Art Studio today!
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/order"
              className="inline-block bg-white text-purple-900 font-bold py-4 px-12 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-2xl text-lg"
            >
              Place Your Order Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
