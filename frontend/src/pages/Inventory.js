import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Fuel, Settings, Phone, ChevronDown, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';

export const vehicles = [
  {
    id: 1,
    name: 'Nissan Frontier Pro-4X',
    year: 2015,
    brand: 'Nissan',
    bodyType: 'Pick-up',
    mileage: '6 Cilindros',
    fuel: 'Gasolina',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/ney20cob_Screenshot%202026-01-30%202230905.png',
  },
  {
    id: 2,
    name: 'Chevrolet Cruze LT',
    year: 2017,
    brand: 'Chevrolet',
    bodyType: 'Sedán',
    mileage: '4 Cilindros',
    fuel: 'Automático',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/gvy2u8ym_Screenshot%202026-01-30%202233715.png',
  },
  {
    id: 3,
    name: 'Volkswagen Golf TSI',
    year: 2015,
    brand: 'Volkswagen',
    bodyType: 'Hatchback',
    mileage: '4 Cilindros',
    fuel: 'Gasolina',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/8myndhig_Screenshot%202026-01-30%202234739%20-%20Copy.png',
  },
  {
    id: 4,
    name: 'Nissan Rogue Advance',
    year: 2016,
    brand: 'Nissan',
    bodyType: 'SUV',
    mileage: '4 Cilindros',
    fuel: 'Gasolina',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/1gpofykx_Screenshot%202026-01-30%202235826.png',
  },
  {
    id: 5,
    name: 'Chevrolet Aveo LS',
    year: 2018,
    brand: 'Chevrolet',
    bodyType: 'Sedán',
    mileage: '4 Cilindros',
    fuel: 'Gasolina',
    image: 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/2kp4mvin_Screenshot%202026-01-31%202000601.png',
  },
];


// Get unique values for filters
const brands = [...new Set(placeholderVehicles.map(v => v.brand))].sort();
// Add more common brands for future inventory
const allBrands = [...new Set([...brands, 'Audi', 'BMW', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mazda', 'Mercedes-Benz', 'Toyota'])].sort();
const bodyTypes = [...new Set(placeholderVehicles.map(v => v.bodyType))].sort();
// Add more body types for future inventory
const allBodyTypes = [...new Set([...bodyTypes, 'Convertible', 'Coupé', 'Crossover', 'Minivan', 'Off-Road', 'Roadster'])].sort();

const Inventory = () => {
  const { t, language } = useLanguage();
  const [brandFilter, setBrandFilter] = useState('');
  const [bodyTypeFilter, setBodyTypeFilter] = useState('');
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [bodyTypeDropdownOpen, setBodyTypeDropdownOpen] = useState(false);

  const filteredVehicles = useMemo(() => {
    return placeholderVehicles.filter(vehicle => {
      if (brandFilter && vehicle.brand !== brandFilter) return false;
      if (bodyTypeFilter && vehicle.bodyType !== bodyTypeFilter) return false;
      return true;
    });
  }, [brandFilter, bodyTypeFilter]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const clearFilters = () => {
    setBrandFilter('');
    setBodyTypeFilter('');
  };

  const hasFilters = brandFilter || bodyTypeFilter;

  return (
    <div data-testid="inventory-page" className="min-h-screen bg-[#050505] pt-24">
      <SEO 
        title="Inventario - Autos Seminuevos"
        description="Explora nuestro inventario de autos seminuevos en Querétaro. Nissan Frontier, Chevrolet Cruze, Volkswagen Golf, y más. Precios competitivos y financiamiento disponible."
        keywords="autos seminuevos, inventario autos Querétaro, Nissan Frontier, Chevrolet Cruze, Volkswagen Golf, Nissan Rogue, Chevrolet Aveo"
        url="https://jrautos.com/inventory"
      />
      {/* Header */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              {language === 'es' ? 'DESCUBRE TU PRÓXIMO AUTO' : 'DISCOVER YOUR NEXT CAR'}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('inventorySubtitle')}
            </p>
          </motion.div>

          {/* Filter Dropdowns */}
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Brand Filter */}
            <div className="relative flex-1">
              <button
                onClick={() => {
                  setBrandDropdownOpen(!brandDropdownOpen);
                  setBodyTypeDropdownOpen(false);
                }}
                data-testid="brand-filter"
                className={`w-full flex items-center justify-between px-6 py-4 rounded-lg border transition-all ${
                  brandFilter 
                    ? 'bg-white/10 border-white/30 text-white' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <span>{brandFilter || (language === 'es' ? 'Marcas' : 'Brands')}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${brandDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {brandDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden">
                  <button
                    onClick={() => {
                      setBrandFilter('');
                      setBrandDropdownOpen(false);
                    }}
                    className="w-full px-6 py-3 text-left text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    {language === 'es' ? 'Todas las marcas' : 'All brands'}
                  </button>
                  {allBrands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => {
                        setBrandFilter(brand);
                        setBrandDropdownOpen(false);
                      }}
                      className={`w-full px-6 py-3 text-left transition-colors ${
                        brandFilter === brand 
                          ? 'bg-white/10 text-white' 
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Body Type Filter */}
            <div className="relative flex-1">
              <button
                onClick={() => {
                  setBodyTypeDropdownOpen(!bodyTypeDropdownOpen);
                  setBrandDropdownOpen(false);
                }}
                data-testid="bodytype-filter"
                className={`w-full flex items-center justify-between px-6 py-4 rounded-lg border transition-all ${
                  bodyTypeFilter 
                    ? 'bg-white/10 border-white/30 text-white' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <span>{bodyTypeFilter || (language === 'es' ? 'Carrocería' : 'Body Type')}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${bodyTypeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {bodyTypeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden">
                  <button
                    onClick={() => {
                      setBodyTypeFilter('');
                      setBodyTypeDropdownOpen(false);
                    }}
                    className="w-full px-6 py-3 text-left text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    {language === 'es' ? 'Todos los tipos' : 'All types'}
                  </button>
                  {allBodyTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setBodyTypeFilter(type);
                        setBodyTypeDropdownOpen(false);
                      }}
                      className={`w-full px-6 py-3 text-left transition-colors ${
                        bodyTypeFilter === type 
                          ? 'bg-white/10 text-white' 
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                data-testid="clear-filters"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
              >
                <X className="w-4 h-4" />
                <span>{language === 'es' ? 'Limpiar' : 'Clear'}</span>
              </button>
            )}
          </motion.div>

          {/* Results Count */}
          <div className="mb-6 text-gray-400 text-sm">
            {filteredVehicles.length} {language === 'es' ? 'vehículos encontrados' : 'vehicles found'}
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`vehicle-card-${vehicle.id}`}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300"
                >
                  {/* Image */}
                  <Link to={`/vehicle/${vehicle.id}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Body Type Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                        {vehicle.bodyType}
                      </div>
                    </div>
                  </Link>

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
                        <Settings className="w-4 h-4" />
                        <span>{vehicle.mileage}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Fuel className="w-4 h-4" />
                        <span>{vehicle.fuel}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <Link to={`/vehicle/${vehicle.id}`} className="block">
                      <Button 
                        data-testid={`view-vehicle-${vehicle.id}`}
                        className="w-full rounded-full bg-white text-black hover:bg-gray-200 font-semibold"
                      >
                        {t('viewDetails')}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">
                {language === 'es' 
                  ? 'No se encontraron vehículos con los filtros seleccionados' 
                  : 'No vehicles found with selected filters'}
              </p>
              <Button 
                onClick={clearFilters}
                className="rounded-full bg-white text-black hover:bg-gray-200"
              >
                {language === 'es' ? 'Limpiar filtros' : 'Clear filters'}
              </Button>
            </div>
          )}

          {/* Contact CTA */}
          <motion.div {...fadeInUp} className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              {language === 'es' 
                ? '¿No encuentras lo que buscas? Contáctanos' 
                : "Can't find what you're looking for? Contact us"}
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
