import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Navbar
    home: 'Home',
    inventory: 'Inventory',
    services: 'Services',
    about: 'About Us',
    contact: 'Contact',
    callNow: 'Call Now',
    
    // Hero
    heroTitle: 'Trusted Auto Broker in Querétaro',
    heroSubtitle: 'Find your perfect vehicle with personalized service and competitive prices',
    viewInventory: 'View Inventory',
    getDirections: 'Get Directions',
    googleRating: 'Google Rating',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Professional automotive solutions tailored to your needs',
    carLeasing: 'Car Leasing',
    carLeasingDesc: 'Flexible leasing options with competitive monthly rates for all vehicle types',
    vehicleSales: 'Vehicle Sales',
    vehicleSalesDesc: 'Quality pre-owned vehicles at the best prices in Querétaro',
    autoBrokerage: 'Auto Brokerage',
    autoBrokerageDesc: 'Expert guidance to find and negotiate the perfect vehicle for you',
    financing: 'Financing Assistance',
    financingDesc: 'We help you find the best financing options for your budget',
    
    // Inventory
    inventoryTitle: 'Our Inventory',
    inventorySubtitle: 'Browse our selection of quality vehicles',
    contactForPrice: 'Contact for Price',
    viewDetails: 'View Details',
    
    // About
    aboutTitle: 'About J.R Autos',
    aboutSubtitle: 'Your Trusted Partner in Querétaro',
    aboutText1: 'J.R Autos is a professional auto brokerage located in La Mora, Centro, Querétaro. We specialize in car leasing and vehicle sales, providing personalized service to help you find the perfect vehicle.',
    aboutText2: 'With our commitment to transparency and customer satisfaction, we have earned a 5-star Google rating. Our team works tirelessly to ensure you get the best deal possible.',
    yearsExperience: 'Years of Experience',
    happyClients: 'Happy Clients',
    vehiclesSold: 'Vehicles Sold',
    
    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'We\'re here to help you find your perfect vehicle',
    phone: 'Phone',
    address: 'Address',
    hours: 'Business Hours',
    saturday: 'Saturday',
    opensAt: 'Opens at 8:30 AM',
    closedNow: 'Closed Now',
    sendMessage: 'Send Message',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourPhone: 'Your Phone',
    message: 'Message',
    send: 'Send',
    sending: 'Sending...',
    messageSent: 'Message Sent!',
    messageError: 'Error sending message',
    
    // Footer
    footerText: 'Your trusted auto broker in Querétaro',
    allRightsReserved: 'All rights reserved',
    
    // CTA
    ctaTitle: 'Ready to Find Your Dream Car?',
    ctaSubtitle: 'Contact us today and let us help you find the perfect vehicle',
  },
  es: {
    // Navbar
    home: 'Inicio',
    inventory: 'Inventario',
    services: 'Servicios',
    about: 'Nosotros',
    contact: 'Contacto',
    callNow: 'Llamar Ahora',
    
    // Hero
    heroTitle: 'Auto Broker de Confianza en Querétaro',
    heroSubtitle: 'Encuentra tu vehículo perfecto con servicio personalizado y precios competitivos',
    viewInventory: 'Ver Inventario',
    getDirections: 'Cómo Llegar',
    googleRating: 'Calificación Google',
    
    // Services
    servicesTitle: 'Nuestros Servicios',
    servicesSubtitle: 'Soluciones automotrices profesionales adaptadas a tus necesidades',
    carLeasing: 'Arrendamiento de Autos',
    carLeasingDesc: 'Opciones flexibles de arrendamiento con tarifas mensuales competitivas para todo tipo de vehículos',
    vehicleSales: 'Venta de Vehículos',
    vehicleSalesDesc: 'Vehículos seminuevos de calidad a los mejores precios en Querétaro',
    autoBrokerage: 'Corretaje Automotriz',
    autoBrokerageDesc: 'Asesoría experta para encontrar y negociar el vehículo perfecto para ti',
    financing: 'Asistencia Financiera',
    financingDesc: 'Te ayudamos a encontrar las mejores opciones de financiamiento para tu presupuesto',
    
    // Inventory
    inventoryTitle: 'Nuestro Inventario',
    inventorySubtitle: 'Explora nuestra selección de vehículos de calidad',
    contactForPrice: 'Contactar por Precio',
    viewDetails: 'Ver Detalles',
    
    // About
    aboutTitle: 'Sobre J.R Autos',
    aboutSubtitle: 'Tu Socio de Confianza en Querétaro',
    aboutText1: 'J.R Autos es una agencia automotriz profesional ubicada en La Mora, Centro, Querétaro. Nos especializamos en arrendamiento y venta de vehículos, brindando un servicio personalizado para ayudarte a encontrar el vehículo perfecto.',
    aboutText2: 'Con nuestro compromiso con la transparencia y la satisfacción del cliente, hemos obtenido una calificación de 5 estrellas en Google. Nuestro equipo trabaja incansablemente para asegurar que obtengas el mejor trato posible.',
    yearsExperience: 'Años de Experiencia',
    happyClients: 'Clientes Felices',
    vehiclesSold: 'Vehículos Vendidos',
    
    // Contact
    contactTitle: 'Contáctanos',
    contactSubtitle: 'Estamos aquí para ayudarte a encontrar tu vehículo perfecto',
    phone: 'Teléfono',
    address: 'Dirección',
    hours: 'Horario',
    saturday: 'Sábado',
    opensAt: 'Abre a las 8:30 AM',
    closedNow: 'Cerrado Ahora',
    sendMessage: 'Enviar Mensaje',
    yourName: 'Tu Nombre',
    yourEmail: 'Tu Correo',
    yourPhone: 'Tu Teléfono',
    message: 'Mensaje',
    send: 'Enviar',
    sending: 'Enviando...',
    messageSent: '¡Mensaje Enviado!',
    messageError: 'Error al enviar mensaje',
    
    // Footer
    footerText: 'Tu auto broker de confianza en Querétaro',
    allRightsReserved: 'Todos los derechos reservados',
    
    // CTA
    ctaTitle: '¿Listo para Encontrar el Auto de tus Sueños?',
    ctaSubtitle: 'Contáctanos hoy y déjanos ayudarte a encontrar el vehículo perfecto',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  
  const t = (key) => translations[language][key] || key;
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
