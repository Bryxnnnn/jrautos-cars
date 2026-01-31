import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MapPin, Star, Car, Shield, HandshakeIcon, CreditCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

const placeholderCars = [
  {
    id: 1,
    name: 'Nissan Frontier Pro-4X',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/ney20cob_Screenshot%202026-01-30%20230905.png',
    year: '2015',
  },
  {
    id: 2,
    name: 'Chevrolet Cruze LT',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/gvy2u8ym_Screenshot%202026-01-30%20233715.png',
    year: '2017',
  },
  {
    id: 3,
    name: 'Volkswagen Golf TSI',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/nsvorm2f_IMG_9600.png',
    year: '2015',
  },
];

const Home = () => {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div data-testid="home-page" className="min-h-screen">
      {/* Hero Section */}
      <section 
        data-testid="hero-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1760713164476-7eb5063b3d07?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBjYXIlMjBkYXJrJTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MHx8fHwxNzY5ODI1MDY3fDA&ixlib=rb-4.1.0&q=85')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Rating Badge */}
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">5.0 {t('googleRating')}</span>
            </motion.div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              {t('heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/inventory">
                <Button 
                  data-testid="hero-inventory-btn"
                  className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-base font-semibold shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  <Car className="w-5 h-5 mr-2" />
                  {t('viewInventory')}
                </Button>
              </Link>
              <a 
                href="https://www.google.com/maps/place/J.R+Autos/@20.1920276,-100.1371684,14z/data=!4m6!3m5!1s0x85d31bcdeceee893:0xdfdcca84b6710f7f!8m2!3d20.1932132!4d-100.1456972!16s%2Fg%2F11yvgfm7cm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  data-testid="hero-directions-btn"
                  variant="outline"
                  className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 px-8 py-6 text-base font-semibold"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  {t('getDirections')}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Featured Inventory Section */}
      <section className="py-24 md:py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white mb-4">
              {t('inventoryTitle')}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('inventorySubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {placeholderCars.map((car, index) => (
              <motion.div
                key={car.id}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/vehicle/${car.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs text-gray-400">{car.year}</span>
                      <h3 className="text-xl font-semibold text-white">{car.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/inventory">
              <Button 
                data-testid="view-all-inventory-btn"
                className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 font-semibold"
              >
                {t('viewInventory')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white mb-4">
              {t('servicesTitle')}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Car, title: t('carLeasing'), desc: t('carLeasingDesc') },
              { icon: Shield, title: t('vehicleSales'), desc: t('vehicleSalesDesc') },
              { icon: HandshakeIcon, title: t('autoBrokerage'), desc: t('autoBrokerageDesc') },
              { icon: CreditCard, title: t('financing'), desc: t('financingDesc') },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white mb-6">
              {t('ctaTitle')}
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
              {t('ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+524481085706">
                <Button 
                  data-testid="cta-call-btn"
                  className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 font-semibold shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t('callNow')}
                </Button>
              </a>
              <Link to="/contact">
                <Button 
                  data-testid="cta-contact-btn"
                  variant="outline"
                  className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 px-8 py-6 font-semibold"
                >
                  {t('contact')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
