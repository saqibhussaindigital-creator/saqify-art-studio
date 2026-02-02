'use client';

import { motion } from 'framer-motion';

export default function About() {
  const teamMembers = [
    {
      name: 'Saqib Hussain',
      role: 'Founder, CEO & Artist',
      description: 'Visionary leader and master artist dedicated to bringing creative dreams to reality.',
      image: '/team/saqib.jpg',
    },
    {
      name: 'Ismail Katlang',
      role: 'Calligraphy Specialist',
      description: 'Master of Islamic art and traditional calligraphy',
      image: '/team/ismail.jpg',
    },
    {
      name: 'Wajeeha Anmol',
      role: 'Creative Director',
      description: 'Expert in digital art and modern design techniques',
      image: '/team/wajeeha.jpg',
    },
  ];

  const values = [
    {
      title: 'Quality',
      description: 'We deliver high-quality art that exceeds expectations',
      icon: '⭐',
      color: 'from-secondary-gold to-secondary-warm',
    },
    {
      title: 'Creativity',
      description: 'Innovation and unique designs in every project',
      icon: '🎨',
      color: 'from-secondary-gold to-secondary-warm',
    },
    {
      title: 'Dedication',
      description: 'Committed to bringing your vision to life',
      icon: '❤️',
      color: 'from-secondary-gold to-secondary-warm',
    },
    {
      title: 'Professionalism',
      description: 'Timely delivery and excellent customer service',
      icon: '✓',
      color: 'from-secondary-gold to-secondary-warm',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

  return (
    <div className="bg-primary-charcoal min-h-screen text-accent-ivory">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-4"
      >
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-secondary-gold to-secondary-warm">
          About Saqify Art Studio
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          We are a passionate team of artists dedicated to creating exceptional art that inspires and transforms spaces.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ boxShadow: '0 25px 50px rgba(201, 162, 77, 0.1)' }}
            className="bg-primary-deep p-10 rounded-2xl shadow-xl border border-secondary-gold/20"
          >
            <h2 className="text-3xl font-serif font-bold mb-6 text-secondary-gold">🎯 Our Mission</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              To create exceptional, personalized art that brings joy, beauty, and cultural richness to every client.
              We believe in the transformative power of art and strive to deliver pieces that resonate with the soul.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ boxShadow: '0 25px 50px rgba(201, 162, 77, 0.1)' }}
            className="bg-primary-deep p-10 rounded-2xl shadow-xl border border-secondary-gold/20"
          >
            <h2 className="text-3xl font-serif font-bold mb-6 text-secondary-warm">🚀 Our Vision</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              To be recognized as a leading art studio that celebrates creativity, cultural heritage, and innovation.
              We aim to make art accessible to everyone and inspire a community of art lovers worldwide.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 text-secondary-gold"
        >
          Our Core Values
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: `0 25px 50px rgba(0, 0, 0, 0.3)` }}
              className={`bg-primary-deep p-8 rounded-2xl text-center hover:shadow-2xl transition-all border border-gray-800 hover:border-secondary-gold`}
            >
              <div className="text-5xl mb-4 inline-block text-secondary-gold">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-accent-ivory">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 text-secondary-warm"
        >
          Meet Our Team
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(201, 162, 77, 0.1)' }}
              className="bg-primary-deep p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all border border-gray-800 hover:border-secondary-gold"
            >
              <motion.div
                className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-secondary-gold/50 shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2 text-accent-ivory">{member.name}</h3>
              <p className="text-secondary-gold font-semibold mb-3">{member.role}</p>
              <p className="text-gray-400">{member.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: '0 30px 60px rgba(201, 162, 77, 0.1)' }}
          className="bg-primary-deep p-12 rounded-2xl shadow-xl max-w-4xl mx-auto border border-secondary-gold/20"
        >
          <h2 className="text-3xl font-serif font-bold mb-6 text-secondary-gold">📖 Our Story</h2>
          <p className="text-gray-300 leading-relaxed mb-4 text-lg">
            Saqify Art Studio was founded with a simple vision: to make exceptional art accessible to everyone.
            Starting as a small creative space, we have grown into a full-service art studio offering a diverse range of services.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            Today, we serve clients from around the world, helping them bring their creative visions to life.
            Our commitment to quality, innovation, and customer satisfaction remains at the heart of everything we do.
          </p>
        </motion.div>
      </div>
    </div >
  );
}

