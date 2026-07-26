import { useEffect } from 'react';
import Hero from '../components/Hero';
import HeroInfoCard from '../components/HeroInfoCard';
import ListingsCarousel from '../components/ListingsCarousel';
import CommunitiesCarousel from '../components/CommunitiesCarousel';
import LeadForm from '../components/LeadForm';
import FAQ from '../components/FAQ';
import { config } from '../config';

const scrollToForm = () => {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
};

const highlights = [
  'Crystal lagoon frontage up to 200m',
  'Lagoon widths reaching up to 110m',
  'Direct access to lagoon beaches',
  'Waterfront promenade with cafés, restaurants & retail',
  'Strong rental and investment potential',
];

const paymentPoints = [
  { title: '5% Down Payment', desc: 'مقدم الحجز' },
  { title: '5% Contract Payment', desc: 'عند التعاقد' },
  { title: 'Equal Installments · 8 Years', desc: 'أقساط متساوية على 8 سنوات' },
  { title: 'Fully Finished + ACs', desc: 'تشطيب كامل مع تكييفات' },
  { title: 'EOIs with 5%', desc: 'تعبير اهتمام بـ 5%' },
];

const Landing = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main>
      <Hero />
      <HeroInfoCard />
      <ListingsCarousel />

      <section id="architecture-design" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-gradient-to-b from-ora-cream to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="font-display text-ora-blue text-xl md:text-2xl mb-3 tracking-wide">
            Live Life… Alive
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ora-ink mb-4">
            Phase Highlights
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Silversands by Ora Developers — وجهة متوسطية فاخرة على الساحل الشمالي، حيث يلتقي اللاجون الكريستالي ببروميناد حيّ ووحدات كاملة التشطيب.
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 text-right mb-10">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 bg-white/80 border border-ora-sand px-4 py-3 rounded-xl"
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-ora-lagoon shrink-0" />
                <span className="text-ora-ink font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-ora-blue text-white rounded-xl hover:bg-ora-blue-light transition-all duration-200 font-semibold shadow-lg"
          >
            اطلب التفاصيل
          </button>
        </div>
      </section>

      <CommunitiesCarousel />

      <section id="payment-plan" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-ora-navy">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 text-center">
            Payment Plan
          </h2>
          <p className="text-white/70 text-center mb-10">
            خطة دفع مرنة — تشطيب كامل + تكييفات
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {paymentPoints.map((point) => (
              <div
                key={point.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm"
              >
                <p className="text-ora-lagoon font-semibold mb-2 text-sm md:text-base">{point.title}</p>
                <p className="text-white/80 text-sm">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location-map" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-gradient-to-b from-ora-blue to-ora-navy">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-center">
            Silversands Experience
          </h2>
          <p className="text-white/75 text-center mb-8">
            Silver Walk & Silver Bay | North Coast · by Ora Developers
          </p>
          <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-ora-navy/50">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              {...(config.mapVideoUrl?.trim() ? { src: config.mapVideoUrl.trim() } : {})}
            >
              {config.mapVideoUrl?.trim() ? (
                <track kind="captions" />
              ) : (
                <>
                  <source src="./location.mp4" type="video/mp4" />
                  <track kind="captions" />
                </>
              )}
            </video>
          </div>
        </div>
      </section>

      <LeadForm />
      <FAQ />
    </main>
  );
};

export default Landing;
