import { motion } from 'framer-motion';
import { config } from '../config';

const Hero = () => {
  const heroVideoSrc = config.heroVideoUrl?.trim() || './hero-video.mp4';
  const heroPosterSrc = config.heroPosterUrl?.trim() || './video-poster.jpg';

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="project-highlights" className="w-full">
      <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={heroPosterSrc}
          src={heroVideoSrc}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ora-navy/70 via-ora-navy/35 to-ora-blue/20" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="text-center px-4 max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 1.1, delay: 0.15 }}
              className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-[0.2em] mb-5"
            >
              SILVERSANDS
            </motion.p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/95 mb-3">
              Introducing Silver Walk & Silver Bay
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              أحدث إطلاق في Silversands — لاجون كريستالي، بروميناد نابض، ووحدات كاملة التشطيب على الساحل الشمالي
            </p>
            <motion.button
              onClick={scrollToForm}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-ora-blue text-white rounded-2xl hover:bg-ora-blue-light transition-all duration-200 font-semibold shadow-xl text-lg"
            >
              اكتشف الوحدات
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
