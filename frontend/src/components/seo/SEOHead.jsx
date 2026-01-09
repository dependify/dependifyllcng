import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  author = 'Tolulope Omotosho',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  faqs = [],
  service = null,
  breadcrumbs = [],
}) => {
  const location = useLocation();
  const siteUrl = 'https://dependifyllc.com.ng';
  const currentUrl = `${siteUrl}${location.pathname}`;
  const defaultImage = 'https://customer-assets.emergentagent.com/job_dc770d34-828b-4b4b-a559-1e817f694ac4/artifacts/clet7dsy_dependify_logo.jpg';
  const siteName = 'Dependify LLC Nigeria';
  
  const seoTitle = title ? `${title} | ${siteName}` : `${siteName} - Your Digital Growth Partner`;
  const seoDescription = description || 'Transform your Nigerian business with LinkedIn optimization, content creation, and digital tools that generate real leads and revenue. 500+ businesses transformed.';
  const seoImage = image?.startsWith('http') ? image : `${siteUrl}${image || '/logo.png'}`;
  const seoKeywords = keywords || 'digital marketing Nigeria, LinkedIn optimization Lagos, content creation agency Nigeria, church CRM software, lead generation Nigeria, SEO services Lagos, business growth Nigeria';

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "alternateName": "Dependify",
    "url": siteUrl,
    "logo": "https://customer-assets.emergentagent.com/job_dc770d34-828b-4b4b-a559-1e817f694ac4/artifacts/clet7dsy_dependify_logo.jpg",
    "description": "Digital marketing agency specializing in LinkedIn optimization, content creation, and church CRM solutions for Nigerian businesses.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Victoria Island",
      "addressLocality": "Lagos",
      "addressCountry": "NG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-810-123-4567",
      "contactType": "customer service",
      "email": "hello@dependifyllc.com.ng",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://linkedin.com/company/dependifyllc",
      "https://twitter.com/dependifyllc",
      "https://instagram.com/dependifyllc",
      "https://facebook.com/dependifyllc"
    ],
    "founder": {
      "@type": "Person",
      "name": "Tolulope Omotosho"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    }
  };

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": siteName,
    "image": `${siteUrl}/logo.png`,
    "url": siteUrl,
    "telephone": "+234-810-123-4567",
    "email": "hello@dependifyllc.com.ng",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Victoria Island",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos",
      "postalCode": "101241",
      "addressCountry": "NG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.4281,
      "longitude": 3.4219
    },
    "priceRange": "₦₦₦",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // FAQ Schema
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Article Schema (for blog posts)
  const articleSchema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": seoDescription,
    "image": seoImage,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  } : null;

  // Service Schema
  const serviceSchema = service ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": siteName
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    },
    "serviceType": service.type || "Digital Marketing"
  } : null;

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${siteUrl}${crumb.path}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Language & Geo */}
      <html lang="en-NG" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="NG-LA" />
      <meta name="geo.placename" content="Lagos, Nigeria" />
      <meta name="geo.position" content="6.4281;3.4219" />
      <meta name="ICBM" content="6.4281, 3.4219" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || siteName} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_NG" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:creator" content="@dependifyllc" />
      <meta name="twitter:site" content="@dependifyllc" />
      
      {/* Article specific (for blog posts) */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Mobile & PWA */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#10B981" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Dependify" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
