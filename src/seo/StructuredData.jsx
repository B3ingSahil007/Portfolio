import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sahil Miyawala",
    "jobTitle": "MERN Stack Developer",
    "url": "https://sahilmiyawala.com", // Placeholder, will update later if domain changes
    "sameAs": [
      "https://github.com/SahilMiyawala", // Assuming based on previous work
      "https://linkedin.com/in/sahil-miyawala"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://sahilmiyawala.com",
    "name": "Sahil Miyawala - Portfolio",
    "description": "MERN Stack Developer | React Developer | React Native Developer | Frontend Developer | Backend Developer | Software Engineer",
    "publisher": {
      "@type": "Person",
      "name": "Sahil Miyawala"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://sahilmiyawala.com",
    "logo": "https://sahilmiyawala.com/vite.svg", // Replace with actual logo URL when available
    "name": "Sahil Miyawala Portfolio"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
