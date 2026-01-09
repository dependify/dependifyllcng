import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import PainPoints from '../components/home/PainPoints';
import Services from '../components/home/Services';
import Process from '../components/home/Process';
import Statistics from '../components/home/Statistics';
import FAQ from '../components/home/FAQ';
import FinalCTA from '../components/home/FinalCTA';
import SEOHead from '../components/seo/SEOHead';
import { OrganizationSchema, LocalBusinessSchema, FAQSchema, WebsiteSchema } from '../components/seo/StructuredData';

const Home = () => {
  return (
    <Layout>
      <SEOHead
        title="LinkedIn Optimization, Content Creation & Church CRM"
        description="Nigeria's #1 Digital Growth Partner. We help Nigerian businesses and ministries generate leads through LinkedIn optimization, SEO content creation, and church CRM systems. 500+ businesses transformed."
        keywords="digital marketing Nigeria, LinkedIn optimization Lagos, content creation agency Nigeria, church CRM software Nigeria, lead generation Nigeria, SEO services Lagos, business growth Nigeria, Dependify"
      />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <FAQSchema />
      <WebsiteSchema />
      
      <Hero />
      <PainPoints />
      <Services />
      <Process />
      <Statistics />
      <FAQ />
      <FinalCTA />
    </Layout>
  );
};

export default Home;
