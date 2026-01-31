import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Shield, HandshakeIcon, CreditCard, CheckCircle, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

const Services = () => {
  const { t, language } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const services = [
    {
      icon: Car,
      title: t('carLeasing'),
      description: t('carLeasingDesc'),
      features: language === 'es' 
        ? ['Pagos mensuales flexibles', 'Opciones de compra al final', 'Mantenimiento incluido', 'Seguro disponible']
        : ['Flexible monthly payments', 'End-of-term purchase options', 'Maintenance included', 'Insurance available'],
    },
    {
      icon: Shield,
      title: t('vehicleSales'),
      description: t('vehicleSalesDesc'),
      features: language === 'es'
        ? ['Vehículos inspeccionados', 'Historial verificado', 'Garantía disponible', 'Precios competitivos']
        : ['Inspected vehicles', 'Verified history', 'Warranty available', 'Competitive prices'],
    },
    {
      icon: HandshakeIcon,
      title: t('autoBrokerage'),
      description: t('autoBrokerageDesc'),
      features: language === 'es'
        ? ['Búsqueda personalizada', 'Negociación experta', 'Ahorro de tiempo', 'Sin comisiones ocultas']
        : ['Personalized search', 'Expert negotiation', 'Time savings', 'No hidden fees'],
    },
    {
      icon: CreditCard,
      title: t('financing'),
      description: t('financingDesc'),
      features: language === 'es'
        ? ['Múltiples opciones de crédito', 'Tasas competitivas', 'Aprobación rápida', 'Asesoría personalizada']
        : ['Multiple credit options', 'Competitive rates', 'Fast approval', 'Personalized advice'],
    },
  ];

  return (
    <div data-testid="services-page" className="min-h-screen bg-[#050505] pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              {t('servicesTitle')}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                data-testid={`service-card-${index}`}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-2xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div {...fadeInUp} className="text-center mt-16">
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              {language === 'es' 
                ? '¿Listo para comenzar? Contáctanos para una consulta gratuita.'
                : 'Ready to get started? Contact us for a free consultation.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+524481085706">
                <Button 
                  data-testid="services-call-btn"
                  className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 font-semibold shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t('callNow')}
                </Button>
              </a>
              <Link to="/contact">
                <Button 
                  data-testid="services-contact-btn"
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

export default Services;
