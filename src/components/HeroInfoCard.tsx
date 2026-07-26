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
    <div id="overview" className="px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10 scroll-mt-24 md:scroll-mt-28">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-md overflow-hidden border border-ora-sand">
          <div className="grid grid-cols-2 divide-x divide-y divide-ora-sand">
            <div className="p-3 md:p-4 text-center md:text-right flex flex-col justify-center">
              <p className="text-xs text-gray-500 mb-1">أحدث إطلاق</p>
              <p className="text-base md:text-lg font-medium text-ora-ink">Silver Walk & Silver Bay</p>
            </div>
            <div className="p-3 md:p-4 text-center md:text-right flex flex-col justify-center">
              <p className="text-xs text-gray-500 mb-1">الوحدات</p>
              <p className="text-base md:text-lg font-medium text-ora-ink">Cabana · Lodge · Apartments</p>
            </div>
            <div className="p-3 md:p-4 flex flex-row flex-wrap justify-center md:justify-end items-center gap-1.5">
              <button
                type="button"
                onClick={scrollToForm}
                className="min-w-[8rem] py-2 px-3 bg-ora-navy text-white text-xs font-medium rounded-md hover:bg-ora-blue transition-colors whitespace-nowrap inline-flex items-center justify-center"
              >
                مهتم
              </button>
              <a
                href="./brochure.pdf"
                download
                className="min-w-[8rem] py-2 px-3 bg-ora-blue text-white text-xs font-medium rounded-md hover:bg-ora-blue-light transition-colors inline-flex items-center justify-center gap-1 whitespace-nowrap"
              >
                <PDFIcon />
                احصل على البروشور
              </a>
            </div>
            <div className="p-3 md:p-4 text-center md:text-right flex flex-col justify-center">
              <p className="text-xs text-gray-500 mb-1">خطة الدفع</p>
              <p className="text-base md:text-lg font-medium text-ora-ink">5% · 5% · 8 سنوات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInfoCard;
