import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { listings } from '../data/listings';

const ListingsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextListing = () => {
    setCurrentIndex((prev) => (prev + 1) % listings.length);
  };

  const prevListing = () => {
    setCurrentIndex((prev) => (prev - 1 + listings.length) % listings.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentListing = listings[currentIndex];
  const prevIndex = (currentIndex - 1 + listings.length) % listings.length;
  const nextIndex = (currentIndex + 1) % listings.length;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-12 lg:pb-20">
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            شاليهات كاملة التشطيب
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-3 md:mb-4">
            بإطلالة خلابة على البحر الاحمر من إدارة مجموعة الماريوت
          </p>
          {/* Card counter - very visible */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
            <span className="text-sm md:text-base font-semibold text-tatweer-orange">
              الوحدة المميزة {currentIndex + 1} من {listings.length}
            </span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Mobile-optimized navigation arrows - larger and more accessible */}
          <button
            onClick={prevListing}
            className="absolute left-0 sm:left-2 md:left-4 lg:left-2 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-3 sm:p-4 md:p-5 shadow-2xl active:bg-orange-50 transition-all duration-200 active:scale-95 border-2 border-gray-200 active:border-tatweer-orange min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="الوحدة السابقة"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-tatweer-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextListing}
            className="absolute right-0 sm:right-2 md:right-4 lg:right-2 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-3 sm:p-4 md:p-5 shadow-2xl active:bg-orange-50 transition-all duration-200 active:scale-95 border-2 border-gray-200 active:border-tatweer-orange min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="الوحدة التالية"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-tatweer-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Main carousel container */}
          <div className="relative overflow-hidden px-12 sm:px-16 md:px-20 lg:px-12">
            <div className="flex items-center justify-center gap-4">
              {/* Previous card preview (desktop only) */}
              <div className="hidden opacity-40 pointer-events-none">
                <div className="bg-white rounded-xl shadow-md p-4 transform scale-90">
                  <div className="aspect-[4/3] rounded-lg mb-2 overflow-hidden bg-gray-100 min-h-[120px]">
                    {listings[prevIndex].image ? (
                      <img src={listings[prevIndex].image} alt={listings[prevIndex].name} className="w-full h-full object-cover object-center" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-600 truncate">
                    {listings[prevIndex].name}
                  </h4>
                </div>
              </div>

              {/* Main card */}
              <div className="flex-1 lg:max-w-5xl lg:mx-auto xl:max-w-6xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -3000) {
                        nextListing();
                      } else if (swipe > 3000) {
                        prevListing();
                      }
                    }}
                    className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 cursor-grab active:cursor-grabbing touch-none"
                  >
                    {/* Swipe hint on mobile - more prominent */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-3 pb-3 border-b border-gray-200">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">اسحب يميناً أو يساراً</span>
                      <svg className="w-5 h-5 text-tatweer-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      {/* Image section */}
                      <div className="order-1 md:order-1">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 min-h-[200px] w-full">
                          {currentListing.image ? (
                            <img src={currentListing.image} alt={currentListing.name} className="w-full h-full object-cover object-center" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-tatweer-orange p-4">
                              <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              <p className="font-semibold text-xs sm:text-sm">صورة المشروع</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="flex flex-col justify-center order-2 md:order-2">
                        <div className="mb-2 flex flex-wrap gap-2">
                          <span className="inline-block px-3 py-1.5 bg-orange-100 text-tatweer-orange rounded-full text-xs sm:text-sm font-semibold">
                            الوحدة {currentIndex + 1}
                          </span>
                          <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-semibold">
                            {currentListing.area}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 mt-2">
                          {currentListing.name}
                        </h3>
                        <p className="text-tatweer-orange font-medium mb-4 text-sm sm:text-base">{currentListing.tagline}</p>
                        
                        {/* Details - mobile optimized */}
                        <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600 text-sm sm:text-base">المقدم</span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                              {currentListing.downpayment}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600 text-sm sm:text-base">خطة التقسيط</span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                              {currentListing.installment}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600 text-sm sm:text-base">تاريخ التسليم</span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                              {currentListing.delivery}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600 text-sm sm:text-base">نوع التشطيب</span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                              {currentListing.finishing}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <span className="text-gray-600 text-sm sm:text-base">السعر</span>
                            <span className="font-bold text-tatweer-orange text-sm sm:text-base">
                              {currentListing.priceRange}
                            </span>
                          </div>
                        </div>
                        
                        {/* CTA Button - larger on mobile */}
                        <motion.button
                          onClick={scrollToForm}
                          whileTap={{ scale: 0.97 }}
                          className="w-full px-6 py-4 sm:py-5 bg-tatweer-orange text-white rounded-xl active:bg-orange-600 transition-all duration-200 font-bold shadow-lg text-base sm:text-lg min-h-[52px] flex items-center justify-center"
                        >
                          طلب التفاصيل
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next card preview (desktop only) */}
              <div className="hidden opacity-40 pointer-events-none">
                <div className="bg-white rounded-xl shadow-md p-4 transform scale-90">
                  <div className="aspect-[4/3] rounded-lg mb-2 overflow-hidden bg-gray-100 min-h-[120px]">
                    {listings[nextIndex].image ? (
                      <img src={listings[nextIndex].image} alt={listings[nextIndex].name} className="w-full h-full object-cover object-center" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-600 truncate">
                    {listings[nextIndex].name}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Large, touch-friendly navigation dots */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 md:mt-8">
            <span className="text-xs sm:text-sm text-gray-500 font-medium mr-1 hidden sm:inline">التنقل:</span>
            {listings.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`transition-all duration-300 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  index === currentIndex
                    ? 'bg-tatweer-orange w-12 h-5 sm:h-6 shadow-lg'
                    : 'bg-gray-300 w-5 h-5 sm:w-6 sm:h-6 active:bg-gray-400 active:w-7'
                }`}
                aria-label={`الانتقال إلى الوحدة ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Text navigation buttons - larger on mobile */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={prevListing}
              className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-gray-100 active:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-all duration-200 text-sm sm:text-base min-h-[48px] min-w-[120px] justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span>السابق</span>
            </button>
            <button
              onClick={nextListing}
              className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-gray-100 active:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-all duration-200 text-sm sm:text-base min-h-[48px] min-w-[120px] justify-center"
            >
              <span>التالي</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingsCarousel;
