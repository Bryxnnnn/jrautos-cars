import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowLeft, Calendar, Fuel, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

// Vehicle data with multiple images
const vehiclesData = {
  1: {
    id: 1,
    name: 'Nissan Frontier Pro-4X',
    year: '2015',
    engine: '6 Cilindros',
    fuel: 'Gasolina',
    transmission: '4x4',
    description: {
      es: 'Potente pickup Nissan Frontier Pro-4X con capacidad todoterreno. Factura de Seminuevo, lista para emplacar en cualquier estado. Equipada con motor V6, tracción 4x4, y todas las características para trabajo pesado y aventuras off-road. Cualquier prueba mecánica o legal.',
      en: 'Powerful Nissan Frontier Pro-4X pickup with off-road capability. Clean title, ready to register in any state. Equipped with V6 engine, 4x4 drive, and all features for heavy work and off-road adventures. Any mechanical or legal inspection welcome.'
    },
    images: [
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/vibds0pt_Screenshot%202026-01-30%20230905.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/3c69n61d_Screenshot%202026-01-30%20230914.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/54i14ufx_Screenshot%202026-01-30%20230919.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/r0d4wbx8_Screenshot%202026-01-30%20230924.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/7ozqxc62_Screenshot%202026-01-30%20230930.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/o14ysd9m_Screenshot%202026-01-30%20231124.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/usa3i3v6_Screenshot%202026-01-30%20231133.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/dtxjkdmc_Screenshot%202026-01-30%20231142.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/e917devo_Screenshot%202026-01-30%20231149.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/qvciqawj_Screenshot%202026-01-30%20231405.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/hvdbkxms_Screenshot%202026-01-30%20231410.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/1adr2f1z_Screenshot%202026-01-30%20231417.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/h33gp79w_Screenshot%202026-01-30%20231422.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/754cvmeu_Screenshot%202026-01-30%20231428.png',
    ],
  },
  2: {
    id: 2,
    name: 'Chevrolet Cruze LT',
    year: '2017',
    engine: '4 Cilindros Turbo',
    fuel: 'Gasolina',
    transmission: 'Automático',
    description: {
      es: 'Elegante sedán Chevrolet Cruze LT 2017 con transmisión automática. Factura original, un solo dueño. Motor turbo eficiente, interior espacioso con tecnología moderna. Listo para cualquier prueba mecánica o legal. Perfecto para uso diario y viajes largos.',
      en: 'Elegant 2017 Chevrolet Cruze LT sedan with automatic transmission. Original title, single owner. Efficient turbo engine, spacious interior with modern technology. Ready for any mechanical or legal inspection. Perfect for daily use and long trips.'
    },
    images: [
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/gvy2u8ym_Screenshot%202026-01-30%20233715.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/1ogsv9r9_Screenshot%202026-01-30%20233732.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/o5kwujau_Screenshot%202026-01-30%20233739.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/okh2i4zf_Screenshot%202026-01-30%20233745.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/3249wjuc_Screenshot%202026-01-30%20233821.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/qz7qvetr_Screenshot%202026-01-30%20233828.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/czaegr1g_Screenshot%202026-01-30%20233837.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/h516vz1e_Screenshot%202026-01-30%20233843.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/dn4oxvkl_Screenshot%202026-01-30%20233848.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/6mqcwzdk_Screenshot%202026-01-30%20234249.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/0e5gr535_Screenshot%202026-01-30%20234254.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/o7sijkze_Screenshot%202026-01-30%20234303.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/uyjgnrd0_Screenshot%202026-01-30%20234311.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/pwqpczn9_Screenshot%202026-01-30%20234318.png',
    ],
  },
  3: {
    id: 3,
    name: 'Volkswagen Golf TSI',
    year: '2015',
    engine: '4 Cilindros Turbo',
    fuel: 'Gasolina',
    transmission: 'Manual',
    description: {
      es: 'Icónico Volkswagen Golf TSI 2015 con motor turbo eficiente y deportivo. Factura de Seminuevo, baja de CDMX, listo para emplacar en cualquier estado. 4 cilindros, manejo preciso, interior de alta calidad alemana. Cualquier prueba mecánica o legal.',
      en: 'Iconic 2015 Volkswagen Golf TSI with efficient and sporty turbo engine. Clean title from CDMX, ready to register in any state. 4 cylinders, precise handling, high-quality German interior. Any mechanical or legal inspection welcome.'
    },
    images: [
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/8myndhig_Screenshot%202026-01-30%20234739%20-%20Copy.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/a7kyklcf_Screenshot%202026-01-30%20234745.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/xijd17h5_Screenshot%202026-01-30%20234750.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/ko9ej9mz_Screenshot%202026-01-30%20234755.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/2k3atull_Screenshot%202026-01-30%20234920.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/fhntl5q1_Screenshot%202026-01-30%20234930.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/ac1di55j_Screenshot%202026-01-30%20234934.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/k2wcqevb_Screenshot%202026-01-30%20234940.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/xfqe907k_Screenshot%202026-01-30%20235001.png',
    ],
  },
  4: {
    id: 4,
    name: 'Nissan Rogue Advance',
    year: '2016',
    engine: '4 Cilindros',
    fuel: 'Gasolina',
    transmission: 'Automático CVT',
    description: {
      es: 'SUV familiar Nissan Rogue Advance 2016 con amplio espacio interior. Factura y pedimento de aduanas, lista para emplacar en cualquier estado. Transmisión CVT suave, 4 cilindros, excelente visibilidad y características de seguridad modernas. Cualquier prueba mecánica o legal.',
      en: 'Family SUV Nissan Rogue Advance 2016 with ample interior space. Title and customs orders, ready to register in any state. Smooth CVT transmission, 4 cylinders, excellent visibility and modern safety features. Any mechanical or legal inspection welcome.'
    },
    images: [
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/1gpofykx_Screenshot%202026-01-30%20235826.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/8b8ahdqz_Screenshot%202026-01-30%20235832.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/azcbdpv6_Screenshot%202026-01-30%20235838.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/zihjfhcw_Screenshot%202026-01-30%20235844.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/aojwphy9_Screenshot%202026-01-30%20235958.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/3aiwubtz_Screenshot%202026-01-31%20000003.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/g8ntgxiq_Screenshot%202026-01-31%20000008.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/zrpe8f52_Screenshot%202026-01-31%20000013.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/6g1u7fva_Screenshot%202026-01-31%20000020.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/103m0dfp_Screenshot%202026-01-31%20000138.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/1y1ac6t5_Screenshot%202026-01-31%20000144.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/asdxxbga_Screenshot%202026-01-31%20000149.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/ph250gi6_Screenshot%202026-01-31%20000155.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/nhckqd07_Screenshot%202026-01-31%20000201.png',
    ],
  },
  5: {
    id: 5,
    name: 'Chevrolet Aveo LS',
    year: '2018',
    engine: '4 Cilindros',
    fuel: 'Gasolina',
    transmission: 'Manual',
    description: {
      es: 'Compacto y económico Chevrolet Aveo LS 2018, perfecto para la ciudad. Factura de banco, baja de Querétaro, listo para emplacar en cualquier estado. 4 cilindros, bajo consumo de combustible, fácil de estacionar. Cualquier prueba mecánica o legal. Excelente opción para primer auto.',
      en: 'Compact and economical 2018 Chevrolet Aveo LS, perfect for the city. Bank title, from Querétaro, ready to register in any state. 4 cylinders, low fuel consumption, easy to park. Any mechanical or legal inspection welcome. Excellent choice for a first car.'
    },
    images: [
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/2kp4mvin_Screenshot%202026-01-31%20000601.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/z9x2mw3b_Screenshot%202026-01-31%20000605.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/i58qfahf_Screenshot%202026-01-31%20000611.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/khra4gm8_Screenshot%202026-01-31%20000617.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/679olry6_Screenshot%202026-01-31%20000738.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/rr2tghlb_Screenshot%202026-01-31%20000744.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/toi5viil_Screenshot%202026-01-31%20000750.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/g1gbtjyo_Screenshot%202026-01-31%20000755.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/gdd8rnfw_Screenshot%202026-01-31%20000802.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/9fg56jhf_Screenshot%202026-01-31%20000910.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/ts6bohd8_Screenshot%202026-01-31%20000914.png',
      'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/azf2vchc_Screenshot%202026-01-31%20000919.png',
    ],
  },
};

const VehicleDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const vehicle = vehiclesData[id];
  
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#050505] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">
            {language === 'es' ? 'Vehículo no encontrado' : 'Vehicle not found'}
          </h1>
          <Link to="/inventory">
            <Button className="rounded-full bg-white text-black hover:bg-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Volver al Inventario' : 'Back to Inventory'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  return (
    <div data-testid="vehicle-detail-page" className="min-h-screen bg-[#050505] pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Back Button */}
        <Link 
          to="/inventory" 
          data-testid="back-to-inventory"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'es' ? 'Volver al Inventario' : 'Back to Inventory'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 mb-4">
              <img
                src={vehicle.images[currentImageIndex]}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows (show only if multiple images) */}
              {vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {vehicle.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {vehicle.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {vehicle.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {vehicle.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex 
                        ? 'border-white' 
                        : 'border-transparent hover:border-white/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Side - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              {vehicle.name}
            </h1>
            <p className="text-accent text-xl mb-6">{t('contactForPrice')}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-gray-400 text-xs">{language === 'es' ? 'Año' : 'Year'}</p>
                    <p className="text-white font-semibold">{vehicle.year}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-gray-400 text-xs">{language === 'es' ? 'Motor' : 'Engine'}</p>
                    <p className="text-white font-semibold">{vehicle.engine}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Fuel className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-gray-400 text-xs">{language === 'es' ? 'Combustible' : 'Fuel'}</p>
                    <p className="text-white font-semibold">{vehicle.fuel}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-gray-400 text-xs">{language === 'es' ? 'Transmisión' : 'Transmission'}</p>
                    <p className="text-white font-semibold">{vehicle.transmission}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {language === 'es' ? 'Descripción' : 'Description'}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {vehicle.description[language]}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <a href="tel:+524481085706" className="block">
                <Button 
                  data-testid="vehicle-call-btn"
                  className="w-full rounded-full bg-white text-black hover:bg-gray-200 py-6 font-semibold text-lg shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t('callNow')} - +52 448 108 5706
                </Button>
              </a>
              <a 
                href={`https://wa.me/524481085706?text=${encodeURIComponent(
                  language === 'es' 
                    ? `Hola, me interesa el ${vehicle.name} ${vehicle.year}. ¿Está disponible?`
                    : `Hi, I'm interested in the ${vehicle.name} ${vehicle.year}. Is it available?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button 
                  data-testid="vehicle-whatsapp-btn"
                  variant="outline"
                  className="w-full rounded-full border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20 py-6 font-semibold"
                >
                  WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
