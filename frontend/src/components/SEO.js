import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords,
  image = 'https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/qi322g9c_Screenshot%202026-01-30%20192319.png',
  url = 'https://jrautos.com'
}) => {
  const fullTitle = title ? `${title} | J.R Autos` : 'J.R Autos | Auto Broker de Confianza en Querétaro';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
