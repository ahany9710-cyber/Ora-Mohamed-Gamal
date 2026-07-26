const scrollToForm = () => {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
};

const PDFIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6" />
  </svg>
);

const HeroInfoCard = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-200">
            <div className="p-3 md:p-4 text-center md:text-right flex flex-col justify-center">
              <p className="text-xs text-gray-500 mb-1">مساحة المشروع</p>
              <p className="text-base md:text-lg font-medium text-gray-900">4,942 فدان</p>
            </div>
            <div className="p-3 md:p-4 text-center md:text-right flex flex-col justify-center">
              <p className="text-xs text-gray-500 mb-1">انواع الوحدات</p>
              <p className="text-base md:text-lg font-medium text-gray-900">شاليه، توين هاوس، فيلا</p>
            </div>
            <div className="p-3 md:p-4 flex flex-row flex-wrap justify-center md:justify-end items-center gap-1.5">
              <button
                type="button"
                onClick={scrollToForm}
                className="min-w-[8rem] py-2 px-3 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap inline-flex items-center justify-center"
              >
                مهتم
              </button>
              <a
                href="./brochure.pdf"
                download
                className="min-w-[8rem] py-2 px-3 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-1 whitespace-nowrap"
              >
                <PDFIcon />
                احصل على البروشور
              </a>
            </div>
            <div className="p-3 md:p-4 text-center md:text-right flex flex-col justify-center">
              <p className="text-xs text-gray-500 mb-1">إستلام المشروع بالكامل</p>
              <p className="text-base md:text-lg font-medium text-gray-900">2030</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInfoCard;
