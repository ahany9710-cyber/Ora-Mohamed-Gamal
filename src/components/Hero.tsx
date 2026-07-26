import { motion } from 'framer-motion';
import { config } from '../config';

const Hero = () => {
  const heroVideoSrc = config.heroVideoUrl?.trim() || './hero-video.mp4';
  const heroPosterSrc = config.heroPosterUrl?.trim() || './video-poster.jpg';

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="project-highlights" className="w-full">
      {/* Full-width video hero section */}
      <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={heroPosterSrc}
          src={heroVideoSrc}
        >
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-tatweer-orange via-orange-600 to-tatweer-navy" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Hero text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 tracking-tight">
              IL Monte Galala
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 font-medium">
              Marina Towers
            </p>
            <p className="text-base md:text-lg text-white/80 mb-2">
              عيش الرفاهية على البحر الأحمر
            </p>
            <p className="text-sm md:text-base text-white/75 mb-8 max-w-2xl mx-auto">
              IL Monte Galala Marina Towers, Tatweer Misr invites world-class operators to join in shaping Egypt's first Red Sea skyline.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-tatweer-orange text-white rounded-2xl hover:bg-orange-600 transition-all duration-200 font-semibold shadow-xl text-lg"
              >
                استكشف الوحدات
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white"
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
