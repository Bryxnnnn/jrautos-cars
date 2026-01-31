import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Car, Award, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';

const About = () => {
  const { t, language } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const stats = [
    { icon: Award, value: '5+', label: t('yearsExperience') },
    { icon: Users, value: '100+', label: t('happyClients') },
    { icon: Car, value: '200+', label: t('vehiclesSold') },
  ];

  return (
    <div data-testid="about-page" className="min-h-screen bg-[#050505] pt-24">
      <SEO 
        title="Nosotros - Sobre J.R Autos"
        description="Conoce J.R Autos, tu auto broker de confianza en Querétaro. Más de 5 años de experiencia, 100+ clientes satisfechos. ⭐ 5.0 Google Rating."
        keywords="sobre JR Autos, historia JR Autos, auto broker confianza Querétaro, agencia autos seminuevos"
        url="https://jrautos.com/about"
      />
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              {t('aboutTitle')}
            </h1>
            <p className="text-accent text-lg">
              {t('aboutSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div {...fadeInUp}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1758599543152-a73184816eba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYXIlMjBzYWxlc21hbiUyMGhhbmRzaGFrZXxlbnwwfHx8fDE3Njk4MjUwODR8MA&ixlib=rb-4.1.0&q=85"
                  alt="J.R Autos Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm px-4 py-3 rounded-xl flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold">5.0</span>
                  <span className="text-gray-400 text-sm">Google</span>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
                {language === 'es' ? 'Confianza y Profesionalismo' : 'Trust and Professionalism'}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                {t('aboutText1')}
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                {t('aboutText2')}
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+524481085706">
                  <Button 
                    data-testid="about-call-btn"
                    className="rounded-full bg-white text-black hover:bg-gray-200 px-6 py-5 font-semibold"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t('callNow')}
                  </Button>
                </a>
                <Link to="/contact">
                  <Button 
                    data-testid="about-contact-btn"
                    variant="outline"
                    className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 px-6 py-5 font-semibold"
                  >
                    {t('contact')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl"
              >
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-accent" />
                </div>
                <div className="font-heading text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
              {language === 'es' ? 'Nuestros Valores' : 'Our Values'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: language === 'es' ? 'Transparencia' : 'Transparency',
                desc: language === 'es' 
                  ? 'Sin costos ocultos ni sorpresas. Precios claros y honestos.'
                  : 'No hidden costs or surprises. Clear and honest pricing.',
              },
              {
                title: language === 'es' ? 'Servicio Personalizado' : 'Personalized Service',
                desc: language === 'es'
                  ? 'Cada cliente es único. Adaptamos nuestro servicio a tus necesidades.'
                  : 'Every customer is unique. We adapt our service to your needs.',
              },
              {
                title: language === 'es' ? 'Calidad Garantizada' : 'Guaranteed Quality',
                desc: language === 'es'
                  ? 'Solo ofrecemos vehículos que cumplen nuestros estándares de calidad.'
                  : 'We only offer vehicles that meet our quality standards.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
