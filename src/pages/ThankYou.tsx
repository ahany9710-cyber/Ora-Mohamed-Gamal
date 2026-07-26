import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trackConversion } from '../utils/gtag';

const ThankYou = () => {
  useEffect(() => {
    trackConversion();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            شكراً! البروشور جاهز.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            سنتواصل معك خلال 10 دقائق.
          </p>
          <div className="space-y-4">
            <motion.a
              href="./brochure.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block w-full px-8 py-4 bg-tatweer-orange text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold shadow-lg"
            >
              تحميل PDF
            </motion.a>
            <Link
              to="/"
              className="block w-full px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-tatweer-orange hover:text-tatweer-orange transition-colors font-semibold"
            >
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
