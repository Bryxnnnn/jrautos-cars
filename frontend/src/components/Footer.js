import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold metallic-text">
                JR Autos
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footerText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('inventory')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-white font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">{t('carLeasing')}</li>
              <li className="text-gray-400 text-sm">{t('vehicleSales')}</li>
              <li className="text-gray-400 text-sm">{t('autoBrokerage')}</li>
              <li className="text-gray-400 text-sm">{t('financing')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-white font-semibold mb-4">{t('contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-accent mt-0.5" />
                <a href="tel:+524481085706" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +52 448 108 5706
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span className="text-gray-400 text-sm">
                  La Mora, Centro, 76850<br />
                  Querétaro, México
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-accent mt-0.5" />
                <span className="text-gray-400 text-sm">
                  {t('saturday')}: 8:30 AM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {currentYear} J.R Autos. {t('allRightsReserved')}.
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="text-gray-400 text-sm">5.0 Google</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
