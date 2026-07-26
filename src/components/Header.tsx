import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

const NAV_LINKS = [
  { href: '#project-highlights', label: 'Silversands' },
  { href: '#overview', label: 'Overview' },
  { href: '#units', label: 'Units' },
  { href: '#architecture-design', label: 'Highlights' },
  { href: '#project-zones', label: 'Walk & Bay' },
  { href: '#payment-plan', label: 'Payment' },
  { href: '#location-map', label: 'Experience' },
  { href: '#lead-form', label: 'Inquiry' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', href);
    }
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-ora-cream/95 backdrop-blur-md shadow-sm' : 'bg-ora-cream'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div dir="ltr" className="flex items-center justify-between h-16 md:h-20 gap-4">
          <a
            href="#project-highlights"
            onClick={(e) => scrollToSection(e, '#project-highlights')}
            className="flex items-center gap-3 md:gap-4 shrink-0"
          >
            <img
              src="./logos/ora-logo.png"
              alt="Ora Developers"
              className="block h-8 md:h-9 w-auto shrink-0 object-contain"
            />
            <img
              src="./logos/silversands-bw.png?v=3"
              alt="Silversands"
              className="block h-[18px] md:h-5 w-auto max-w-[160px] md:max-w-[200px] shrink-0 object-contain"
            />
          </a>
          <nav className="hidden xl:flex items-center gap-0.5 flex-wrap justify-end">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-2 py-2 text-xs xl:text-sm font-medium text-ora-ink hover:text-ora-blue transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${config.phoneNumber}`}
              className="px-2 py-2 text-xs xl:text-sm font-medium text-ora-ink hover:text-ora-blue transition-colors whitespace-nowrap"
            >
              اتصل بنا
            </a>
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2 text-xs xl:text-sm font-medium text-ora-ink hover:text-ora-blue transition-colors whitespace-nowrap"
            >
              واتساب
            </a>
            <a
              href="#lead-form"
              onClick={(e) => scrollToSection(e, '#lead-form')}
              className="ml-1 px-4 py-2 bg-ora-blue text-white rounded-xl hover:bg-ora-blue-light transition-all duration-200 hover:scale-105 font-medium shadow-md text-xs xl:text-sm whitespace-nowrap"
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
