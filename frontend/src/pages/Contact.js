import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
      // Only show success if the response contains the saved record with an ID
      if (response.data && response.data.id) {
        console.log('Contact message saved successfully:', response.data.id);
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Invalid response - message may not have been saved');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Check if currently closed (not Saturday 8:30 AM+)
  const isCurrentlyClosed = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();
    const minutes = now.getMinutes();
    
    // Open on Saturday from 8:30 AM
    if (day === 6 && (hour > 8 || (hour === 8 && minutes >= 30))) {
      return false;
    }
    return true;
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('phone'),
      value: '+52 448 108 5706',
      link: 'tel:+524481085706',
    },
    {
      icon: MapPin,
      title: t('address'),
      value: 'La Mora, Centro, 76850\nQuerétaro, Querétaro, México',
      link: 'https://www.google.com/maps/place/J.R+Autos/@20.1920276,-100.1371684,14z/data=!4m6!3m5!1s0x85d31bcdeceee893:0xdfdcca84b6710f7f!8m2!3d20.1932132!4d-100.1456972!16s%2Fg%2F11yvgfm7cm',
    },
    {
      icon: Clock,
      title: t('hours'),
      value: `${t('saturday')}: ${t('opensAt')}`,
      status: isCurrentlyClosed() ? t('closedNow') : 'Open',
    },
  ];

  return (
    <div data-testid="contact-page" className="min-h-screen bg-[#050505] pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              {t('contactTitle')}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('contactSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info & Map */}
            <motion.div {...fadeInUp}>
              {/* Contact Cards */}
              <div className="space-y-6 mb-10">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    data-testid={`contact-info-${index}`}
                    className="flex items-start space-x-4 p-6 bg-white/5 border border-white/10 rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-gray-400 hover:text-white transition-colors whitespace-pre-line"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div>
                          <p className="text-gray-400 whitespace-pre-line">{info.value}</p>
                          {info.status && (
                            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                              info.status === t('closedNow') 
                                ? 'bg-red-500/20 text-red-400' 
                                : 'bg-green-500/20 text-green-400'
                            }`}>
                              {info.status}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Map */}
              <div 
                data-testid="google-map"
                className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.6!2d-100.45!3d20.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLa%20Mora%2C%20Centro%2C%2076850%20Quer%C3%A9taro%2C%20Mexico!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="J.R Autos Location"
                />
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="font-heading text-2xl font-semibold text-white mb-6">
                  {t('sendMessage')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-gray-300 mb-2 block">
                      {t('yourName')}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      data-testid="contact-name-input"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30"
                      placeholder={language === 'es' ? 'Juan Pérez' : 'John Doe'}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-gray-300 mb-2 block">
                      {t('yourEmail')}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      data-testid="contact-email-input"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-gray-300 mb-2 block">
                      {t('yourPhone')}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      data-testid="contact-phone-input"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30"
                      placeholder="+52 448 000 0000"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-gray-300 mb-2 block">
                      {t('message')}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      data-testid="contact-message-input"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 resize-none"
                      placeholder={language === 'es' 
                        ? 'Me interesa obtener más información sobre...' 
                        : 'I am interested in getting more information about...'}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={status === 'sending'}
                    data-testid="contact-submit-btn"
                    className={`w-full rounded-full py-6 font-semibold transition-all ${
                      status === 'success'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-white text-black hover:bg-gray-200'
                    }`}
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                        {t('sending')}
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {t('messageSent')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t('send')}
                      </>
                    )}
                  </Button>

                  {/* Error Message */}
                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center">
                      {t('messageError')}
                    </p>
                  )}
                </form>

                {/* Alternative Contact */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-gray-400 text-sm mb-4">
                    {language === 'es' 
                      ? 'O contáctanos directamente:' 
                      : 'Or contact us directly:'}
                  </p>
                  <a href="tel:+524481085706">
                    <Button 
                      data-testid="contact-direct-call-btn"
                      variant="outline"
                      className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      +52 448 108 5706
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
