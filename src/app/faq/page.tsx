'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'How long does it take to complete a custom art project?',
      answer: 'Project timelines vary depending on complexity and size. Simple portraits typically take 2-3 weeks, while larger custom pieces may take 4-8 weeks. We will provide a specific timeline upon receiving your order details.',
    },
    {
      id: '2',
      question: 'What are your payment methods?',
      answer: 'We accept all major credit cards, bank transfers, and PayPal. A deposit of 50% is required to start the project, with the remaining balance due upon completion.',
    },
    {
      id: '3',
      question: 'Do you offer revisions on commissioned artwork?',
      answer: 'Yes! We include up to 2 rounds of revisions for all custom projects. Additional revisions may incur extra fees. Our goal is to ensure you\'re completely satisfied with the final piece.',
    },
    {
      id: '4',
      question: 'Can I request changes to my design after ordering?',
      answer: 'Absolutely! We understand that your vision may evolve. Minor changes can be incorporated at no cost, while major revisions may require additional time and fees.',
    },
    {
      id: '5',
      question: 'What is your refund policy?',
      answer: 'We offer a full refund of the initial deposit if you cancel before work begins. Once work has started, the deposit is non-refundable, but you can receive the artwork or store credit instead.',
    },
    {
      id: '6',
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship worldwide with tracked delivery. Shipping costs are calculated based on destination and artwork size. You can request an estimate before finalizing your order.',
    },
    {
      id: '7',
      question: 'What materials do you use for your artwork?',
      answer: 'We use premium quality materials including professional-grade paints, high-quality canvases, and archival paper. For specific material requirements, please mention them in your order details.',
    },
    {
      id: '8',
      question: 'Do you offer bulk orders or discounts?',
      answer: 'Yes! We offer special pricing for bulk orders and corporate projects. Please contact us directly for a custom quote for large orders.',
    },
    {
      id: '9',
      question: 'How can I track my order?',
      answer: 'Once your order is placed and payment is confirmed, you\'ll receive regular updates via email. We provide photos of your artwork in progress and shipping tracking information.',
    },
    {
      id: '10',
      question: 'Can you work with my specific color preferences?',
      answer: 'Definitely! We can match any color palette or mood you prefer. Just provide color samples, references, or detailed descriptions in your order.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Find answers to common questions about our services, pricing, and process
        </p>
      </motion.div>

      {/* FAQ Items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        {faqs.map((faq) => (
          <motion.div
            key={faq.id}
            variants={itemVariants}
            className="mb-4 bg-gray-900 rounded-lg shadow-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
            >
              <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
              <motion.span
                animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl text-purple-400 flex-shrink-0"
              >
                ▼
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedId === faq.id ? 'auto' : 0,
                opacity: expandedId === faq.id ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-16 text-center bg-gray-900 p-12 rounded-lg shadow-lg max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Didn&apos;t find your answer?</h2>
        <p className="text-gray-300 mb-6">
          Get in touch with us directly. We&apos;re always happy to help!
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/contact"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
        >
          Contact Us
        </motion.a>
      </motion.div>
    </div>
  );
}
