'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: <FaInstagram />, label: 'Instagram', href: 'https://www.instagram.com/curioussaqibartist/' },
    { icon: <FaFacebook />, label: 'Facebook', href: 'https://www.facebook.com/curioussaqibartist/' },
    { icon: <FaTiktok />, label: 'TikTok', href: 'https://www.tiktok.com/@curioussaqibartist?_r=1&_t=ZS-925to32Ra6f&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnOAXeHbKIcN34YVu5MuKUGBgB4X_2MHMrUutofw4oUlG2CeJRdSBBNIp7PTw_aem_Ex1xvNYjZapNwe-007Bm-g' },
    { icon: <FaYoutube />, label: 'Youtube', href: 'https://www.youtube.com/@curioussaqibartist' },
    { icon: <FaLinkedin />, label: 'Linkedin', href: 'https://www.linkedin.com/in/curious-saqib-social-media-manger/' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-12 border-t border-purple-700 border-opacity-30 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/hero-collage.png')" }}></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-purple-900/90"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <img src="/logo.png" alt="Saqify Art Studio" className="h-16 w-auto object-contain" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Saqify Art Studio
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Creating exceptional art that brings beauty and inspiration to every project.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:saqibhussaindigital@gmail.com" className="hover:text-purple-400 transition-colors">
                  saqibhussaindigital@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923478025660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <span>WhatsApp:</span> +92347-8025660
                </a>
              </li>
              <li>Katlang Mardan<br />KPK Pakistan</li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl hover:text-purple-400 transition-colors"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-8"
        />

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-400 text-sm"
        >
          <p>&copy; {currentYear} Saqify Art Studio. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ by passionate artists</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
