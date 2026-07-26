import Hero from '../components/Hero';
import HeroInfoCard from '../components/HeroInfoCard';
import ListingsCarousel from '../components/ListingsCarousel';
import CommunitiesCarousel from '../components/CommunitiesCarousel';
import LeadForm from '../components/LeadForm';
import FAQ from '../components/FAQ';
import { config } from '../config';

const scrollToForm = () => {
  const formSection = document.getElementById('lead-form');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const Landing = () => {
  return (
    <main>
      <Hero />
      <HeroInfoCard />
      <ListingsCarousel />
      <section id="architecture-design" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Architecture & Design
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            IL Monte Galala - Marina Towers combines modern architecture with luxury living. Designed by Tatweer Misr, the project features world-class design across 4,942 acres in Al Ain Al Sokhna, Red Sea.
          </p>
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-tatweer-orange text-white rounded-xl hover:bg-orange-600 transition-all duration-200 font-semibold shadow-lg"
          >
            Make an Inquiry
          </button>
        </div>
      </section>
      <CommunitiesCarousel />
      <section id="location-map" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-tatweer-navy">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            Location Map
          </h2>
          <p className="text-gray-300 text-center mb-8">
            IL Monte Galala - Marina Towers | Al Ain Al Sokhna, Red Sea
          </p>
          <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-gray-800">
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
                  <source src="./location.mov" type="video/quicktime" />
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
