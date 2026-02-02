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
    { icon: <FaFacebook />, label: 'Facebook', href: 'https://www.facebook.com/share/16sDXWzW9J/' },
    { icon: <FaTiktok />, label: 'TikTok', href: 'https://www.tiktok.com/@curioussaqibartist?_r=1&_t=ZS-925to32Ra6f&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnOAXeHbKIcN34YVu5MuKUGBgB4X_2MHMrUutofw4oUlG2CeJRdSBBNIp7PTw_aem_Ex1xvNYjZapNwe-007Bm-g' },
    { icon: <FaYoutube />, label: 'Youtube', href: 'https://www.youtube.com/@curioussaqibartist' },
    { icon: <FaLinkedin />, label: 'Linkedin', href: 'https://www.linkedin.com/in/curious-saqib-social-media-manger/' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-primary-deep text-accent-ivory py-12 border-t border-secondary-gold/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-5 bg-auto opacity-10" style={{ backgroundImage: "url('/hero-collage.png')" }}></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <img src="/logo.png" alt="Saqify Art Studio" className="h-20 w-auto object-contain" />
              <span className="text-2xl font-serif font-bold text-secondary-gold">
                Saqify Art Studio
              </span>
            </div>
            <p className="text-accent-beige text-sm leading-relaxed mb-4">
              Where Art Meets Emotion.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Custom sketches, paintings, calligraphy, gifts, and complete creative services for local and global clients.
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
                    className="text-gray-400 hover:text-secondary-gold transition-colors text-sm"
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
                <a href="mailto:saqibhussaindigital@gmail.com" className="hover:text-secondary-gold transition-colors">
                  saqibhussaindigital@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923478025660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary-gold transition-colors flex items-center gap-2"
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
                  className="text-2xl hover:text-secondary-gold transition-colors"
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
          className="h-px bg-gradient-to-r from-transparent via-secondary-gold to-transparent opacity-30 my-8"
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
