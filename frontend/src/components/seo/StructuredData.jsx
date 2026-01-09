import React from 'react';
import { Helmet } from 'react-helmet-async';
import { companyInfo, services, faqs, testimonials, aboutContent, blogPosts } from '../../data/mock';

const siteUrl = 'https://dependifyllc.com.ng';
const logoUrl = 'https://customer-assets.emergentagent.com/job_dc770d34-828b-4b4b-a559-1e817f694ac4/artifacts/clet7dsy_dependify_logo.jpg';

// Organization Schema
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dependify LLC Nigeria",
    "alternateName": "Dependify.ng",
    "url": siteUrl,
    "logo": logoUrl,
    "description": "Nigeria's #1 Digital Growth Partner - LinkedIn optimization, content creation, and church CRM solutions for Nigerian businesses and ministries.",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Tolulope Omotosho",
      "url": "https://www.linkedin.com/in/tolulopeomotosho/",
      "jobTitle": "CEO & Founder"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Victoria Island",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos State",
      "postalCode": "101241",
      "addressCountry": "NG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": companyInfo.phone,
      "contactType": "customer service",
      "email": companyInfo.email,
      "availableLanguage": ["English", "Yoruba", "Igbo", "Hausa"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/28927544",
      companyInfo.socialLinks.twitter,
      companyInfo.socialLinks.instagram,
      companyInfo.socialLinks.facebook,
      "https://www.linkedin.com/in/tolulopeomotosho/"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    },
    "knowsAbout": [
      "LinkedIn Marketing",
      "Content Creation",
      "SEO",
      "Digital Marketing",
      "Church CRM",
      "Lead Generation"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Local Business Schema
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dependify LLC Nigeria",
    "image": logoUrl,
    "url": siteUrl,
    "telephone": companyInfo.phone,
    "email": companyInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Victoria Island",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos State",
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
      "reviewCount": "127",
      "bestRating": "5"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// FAQ Schema
export const FAQSchema = ({ faqItems }) => {
  const items = faqItems || faqs;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Service Schema
export const ServiceSchema = ({ service }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Dependify LLC Nigeria",
      "url": "https://dependifyllc.com.ng"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.features.map((feature, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feature
        }
      }))
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Blog Post Schema
export const BlogPostSchema = ({ post }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": post.author.linkedin || "https://www.linkedin.com/in/tolulopeomotosho/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dependify LLC Nigeria",
      "logo": {
        "@type": "ImageObject",
        "url": logoUrl
      }
    },
    "datePublished": post.publishedDate,
    "dateModified": post.modifiedDate || post.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content?.split(' ').length || 1500,
    "inLanguage": "en-NG"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Breadcrumb Schema
export const BreadcrumbSchema = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.path}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Review Schema
export const ReviewSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Dependify Digital Marketing Services",
    "description": "Professional digital marketing services for Nigerian businesses",
    "brand": {
      "@type": "Brand",
      "name": "Dependify LLC Nigeria"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": testimonials.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating.toString(),
        "bestRating": "5"
      },
      "reviewBody": t.quote
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Website Schema with SearchAction
export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dependify LLC Nigeria",
    "url": siteUrl,
    "description": "Nigeria's #1 Digital Growth Partner for LinkedIn optimization, content creation, and church CRM solutions.",
    "publisher": {
      "@type": "Organization",
      "name": "Dependify LLC Nigeria"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default {
  OrganizationSchema,
  LocalBusinessSchema,
  FAQSchema,
  ServiceSchema,
  BlogPostSchema,
  BreadcrumbSchema,
  ReviewSchema,
  WebsiteSchema
};
