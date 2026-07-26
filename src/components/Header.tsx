import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

const NAV_LINKS = [
  { href: '#project-highlights', label: 'Project Highlights' },
  { href: '#architecture-design', label: 'Architecture & Design' },
  { href: '#project-zones', label: 'Project Zones' },
  { href: '#location-map', label: 'Location Map' },
  { href: '#lead-form', label: 'Make an Inquiry' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-white/0 backdrop-blur-none'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4 md:gap-6">
            <img
              src="./logos/tatweer-logo.png"
              alt="Tatweer Misr"
              className="h-8 md:h-10 w-auto object-contain"
            />
            <img
              src="./logos/il-monte-galala-logo.png"
              alt="IL Monte Galala - Red Sea Marina Towers"
              className="h-10 md:h-12 w-auto object-contain invert"
            />
          </div>
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-tatweer-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${config.phoneNumber}`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-tatweer-orange transition-colors"
            >
              اتصل بنا
            </a>
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-tatweer-orange transition-colors"
            >
              واتساب
            </a>
            <a
              href="#lead-form"
              onClick={(e) => scrollToSection(e, '#lead-form')}
              className="px-5 py-2 bg-tatweer-orange text-white rounded-xl hover:bg-orange-600 transition-all duration-200 hover:scale-105 font-medium shadow-md"
            >
              تحميل البروشور
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
