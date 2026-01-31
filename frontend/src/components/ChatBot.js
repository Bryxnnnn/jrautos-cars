import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock, MapPin, Car, DollarSign, FileText, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ChatBot = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef(null);

  // Translations
  const content = {
    es: {
      greeting: '¡Hola! 👋 Soy el asistente virtual de J.R Autos. ¿En qué puedo ayudarte?',
      selectOption: 'Selecciona una opción:',
      options: [
        { id: 'hours', icon: Clock, label: '¿Cuál es su horario?' },
        { id: 'location', icon: MapPin, label: '¿Dónde están ubicados?' },
        { id: 'inventory', icon: Car, label: '¿Qué autos tienen disponibles?' },
        { id: 'prices', icon: DollarSign, label: '¿Cómo son los precios?' },
        { id: 'documents', icon: FileText, label: '¿Qué documentos necesito?' },
        { id: 'contact', icon: Phone, label: 'Hablar con un asesor' },
      ],
      responses: {
        hours: '🕐 Nuestro horario de atención es:\n\n• Lunes a Viernes: 9:00 AM - 6:00 PM\n• Sábados: 8:30 AM - 3:00 PM\n• Domingos: Cerrado\n\n¿Hay algo más en lo que pueda ayudarte?',
        location: '📍 Estamos ubicados en:\n\nLa Mora, Centro, 76850\nQuerétaro, Querétaro, México\n\nPuedes visitarnos cuando gustes durante nuestro horario de atención. ¿Necesitas ayuda con algo más?',
        inventory: '🚗 Contamos con una variedad de vehículos seminuevos de las mejores marcas:\n\n• Nissan (Frontier, Rogue)\n• Chevrolet (Aveo, Cruze)\n• Volkswagen (Golf)\n• Y más...\n\nPuedes ver todo nuestro inventario en la sección "Inventario" del sitio. ¿Te gustaría saber algo más?',
        prices: '💰 Nuestros precios varían según el vehículo, año, y condiciones.\n\nOfrecemos:\n• Precios competitivos\n• Opciones de financiamiento\n• Facilidades de pago\n\nPara conocer el precio de un vehículo específico, te recomiendo contactarnos directamente. ¿Puedo ayudarte con algo más?',
        documents: '📄 Para comprar un vehículo necesitas:\n\n• Identificación oficial (INE/Pasaporte)\n• Comprobante de domicilio\n• RFC (si requieres factura)\n\nNosotros te entregamos:\n• Factura o carta responsiva\n• Documentación completa del vehículo\n\n¿Tienes otra pregunta?',
        contact: '📱 ¡Con gusto te atendemos!\n\nTe conectaré con uno de nuestros asesores por WhatsApp. Respondemos durante nuestro horario de atención (Lun-Vie 9AM-6PM, Sáb 8:30AM-3PM).',
      },
      moreHelp: '¿Necesitas más ayuda?',
      whatsappBtn: 'Chatear por WhatsApp',
      backToOptions: 'Ver más opciones',
      inputPlaceholder: 'Selecciona una opción arriba...',
    },
    en: {
      greeting: "Hi! 👋 I'm J.R Autos' virtual assistant. How can I help you?",
      selectOption: 'Select an option:',
      options: [
        { id: 'hours', icon: Clock, label: 'What are your hours?' },
        { id: 'location', icon: MapPin, label: 'Where are you located?' },
        { id: 'inventory', icon: Car, label: 'What cars do you have?' },
        { id: 'prices', icon: DollarSign, label: 'How are the prices?' },
        { id: 'documents', icon: FileText, label: 'What documents do I need?' },
        { id: 'contact', icon: Phone, label: 'Talk to an advisor' },
      ],
      responses: {
        hours: '🕐 Our business hours are:\n\n• Monday to Friday: 9:00 AM - 6:00 PM\n• Saturday: 8:30 AM - 3:00 PM\n• Sunday: Closed\n\nIs there anything else I can help you with?',
        location: "📍 We're located at:\n\nLa Mora, Centro, 76850\nQuerétaro, Querétaro, Mexico\n\nFeel free to visit us during business hours. Need help with anything else?",
        inventory: "🚗 We have a variety of pre-owned vehicles from top brands:\n\n• Nissan (Frontier, Rogue)\n• Chevrolet (Aveo, Cruze)\n• Volkswagen (Golf)\n• And more...\n\nYou can see our full inventory in the 'Inventory' section. Would you like to know anything else?",
        prices: '💰 Our prices vary by vehicle, year, and condition.\n\nWe offer:\n• Competitive prices\n• Financing options\n• Flexible payment plans\n\nTo get the price of a specific vehicle, I recommend contacting us directly. Can I help with anything else?',
        documents: '📄 To buy a vehicle you need:\n\n• Official ID (INE/Passport)\n• Proof of address\n• RFC (if you need an invoice)\n\nWe provide:\n• Invoice or responsibility letter\n• Complete vehicle documentation\n\nDo you have another question?',
        contact: "📱 We'd love to help!\n\nI'll connect you with one of our advisors via WhatsApp. We respond during business hours (Mon-Fri 9AM-6PM, Sat 8:30AM-3PM).",
      },
      moreHelp: 'Need more help?',
      whatsappBtn: 'Chat on WhatsApp',
      backToOptions: 'See more options',
      inputPlaceholder: 'Select an option above...',
    },
  };

  const t = content[language];

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ type: 'bot', text: t.greeting }]);
    }
  }, [isOpen, messages.length, t.greeting]);

  // Reset messages when language changes
  useEffect(() => {
    if (messages.length > 0) {
      setMessages([{ type: 'bot', text: t.greeting }]);
      setShowOptions(true);
    }
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = (optionId) => {
    const option = t.options.find(o => o.id === optionId);
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);
    setShowOptions(false);

    // Add bot response after delay
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: t.responses[optionId] }]);
      
      // Show WhatsApp button for contact option
      if (optionId === 'contact') {
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'whatsapp' }]);
        }, 500);
      } else {
        // Show options again after other responses
        setTimeout(() => {
          setShowOptions(true);
        }, 500);
      }
    }, 800);
  };

  const openWhatsApp = () => {
    const message = language === 'es' 
      ? 'Hola, vengo del chatbot de su sitio web y me gustaría más información.'
      : 'Hi, I came from your website chatbot and would like more information.';
    window.open(`https://wa.me/524481085706?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        data-testid="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          /* Headset/Support Icon */
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-testid="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-6 z-50 w-[350px] max-w-[calc(100vw-48px)] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">J.R Autos</h3>
                  <p className="text-white/70 text-xs">
                    {language === 'es' ? 'Asistente Virtual' : 'Virtual Assistant'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[300px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.type === 'bot' && (
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                        <p className="text-gray-300 text-sm whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  )}
                  {msg.type === 'user' && (
                    <div className="flex justify-end">
                      <div className="bg-blue-500 rounded-2xl rounded-tr-sm p-3 max-w-[85%]">
                        <p className="text-white text-sm">{msg.text}</p>
                      </div>
                    </div>
                  )}
                  {msg.type === 'whatsapp' && (
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={openWhatsApp}
                          className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-2 text-sm font-medium flex items-center space-x-2 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span>{t.whatsappBtn}</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowOptions(true);
                          }}
                          className="text-gray-400 hover:text-white text-xs underline"
                        >
                          {t.backToOptions}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Options */}
              {showOptions && messages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-gray-500 text-xs ml-10">{t.selectOption}</p>
                  <div className="grid grid-cols-1 gap-2 ml-10">
                    {t.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionClick(option.id)}
                        className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-left transition-colors group"
                      >
                        <option.icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                        <span className="text-gray-300 text-sm group-hover:text-white">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-3">
              <div className="bg-white/5 rounded-xl px-4 py-2 text-gray-500 text-sm">
                {t.inputPlaceholder}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
