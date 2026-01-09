import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, FileText, Heart, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { services, blogPosts } from '../data/mock';
import SEOHead from '../components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../components/seo/StructuredData';

const iconComponents = {
  Linkedin: () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  FileText: () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
};

const Services = () => {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <Layout>
      <SEOHead
        title="Digital Marketing Services for Nigerian Businesses"
        description="LinkedIn optimization, SEO content creation, and church CRM solutions for Nigerian businesses. Transform your digital presence and generate qualified leads."
        keywords="LinkedIn optimization Nigeria, content creation Lagos, church CRM Nigeria, digital marketing services Africa, SEO agency Nigeria"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' }
      ]} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Solutions Built for{' '}
            <span className="text-emerald-400">Nigerian Growth</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three specialized services designed to transform your business, 
            build your authority, and generate consistent leads.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const IconComponent = iconComponents[service.icon];
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div 
                      className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                      style={{ backgroundColor: service.color }}
                    />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="relative rounded-3xl w-full aspect-[4/3] object-cover shadow-xl"
                    />
                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-xl p-4">
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-xl font-bold text-gray-900">{service.pricing}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      <div style={{ color: service.color }}>
                        <IconComponent />
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features Preview */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-700">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: service.color }}
                          />
                          <span className="text-sm">{feature.split(' ').slice(0, 3).join(' ')}</span>
                        </div>
                      ))}
                    </div>

                    <Link to={`/services/${service.id}`}>
                      <Button
                        size="lg"
                        className="font-semibold px-8 rounded-xl text-white"
                        style={{ backgroundColor: service.color }}
                      >
                        Learn More
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Learn More on Our Blog</h2>
            <Link to="/blog" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-emerald-600 text-sm font-medium">{post.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Not Sure Which Service Is Right For You?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book a free consultation and let's discuss your specific needs and goals.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-10 py-6 text-lg rounded-xl"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
