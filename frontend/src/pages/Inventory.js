import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Fuel, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

const placeholderVehicles = [
  {
    id: 1,
    name: 'Nissan Frontier Pro-4X',
    year: '2015',
    mileage: '6 Cilindros',
    fuel: 'Gasolina',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/lmrajlxk_IMG_9598.png',
  },
  {
    id: 2,
    name: 'Chevrolet Cruze LT',
    year: '2017',
    mileage: '4 Cilindros',
    fuel: 'Automático',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/bbs6jamq_IMG_9599.png',
  },
  {
    id: 3,
    name: 'Volkswagen Golf TSI',
    year: '2015',
    mileage: '4 Cilindros',
    fuel: 'Gasolina',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/nsvorm2f_IMG_9600.png',
  },
  {
    id: 4,
    name: 'Nissan Rogue Advance',
    year: '2016',
    mileage: '4 Cilindros',
    fuel: 'Gasolina',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/88pzb5dk_IMG_9601.png',
  },
  {
    id: 5,
    name: 'Chevrolet Aveo LS',
    year: '2018',
    mileage: '4 Cilindros',
    fuel: 'Gasolina',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/k0lzzgga_IMG_9602.png',
  },
];

const Inventory = () => {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <div data-testid="inventory-page" className="min-h-screen bg-[#050505] pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              {t('inventoryTitle')}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('inventorySubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                data-testid={`vehicle-card-${vehicle.id}`}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-white">
                        {vehicle.name}
                      </h3>
                      <p className="text-accent text-sm mt-1">{t('contactForPrice')}</p>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{vehicle.year}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Gauge className="w-4 h-4" />
                      <span>{vehicle.mileage}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Fuel className="w-4 h-4" />
                      <span>{vehicle.fuel}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <a href="tel:+524481085706" className="block">
                    <Button 
                      data-testid={`contact-vehicle-${vehicle.id}`}
                      className="w-full rounded-full bg-white text-black hover:bg-gray-200 font-semibold"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {t('callNow')}
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div {...fadeInUp} className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              {t('inventorySubtitle')}
            </p>
            <a href="tel:+524481085706">
              <Button 
                data-testid="inventory-call-btn"
                className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 font-semibold shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                <Phone className="w-5 h-5 mr-2" />
                +52 448 108 5706
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Inventory;
