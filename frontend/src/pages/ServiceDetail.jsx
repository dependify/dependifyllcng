import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Linkedin, FileText, Heart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { services, blogPosts } from '../data/mock';
import SEOHead from '../components/seo/SEOHead';
import { ServiceSchema, BreadcrumbSchema, OrganizationSchema, FAQSchema } from '../components/seo/StructuredData';

const iconComponents = {
  Linkedin: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  FileText: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services.find(s => s.id === id);
  const otherServices = services.filter(s => s.id !== id);

  // Get related blog posts based on service
  const getRelatedPosts = () => {
    if (id === 'linkedin-optimization') {
      return blogPosts.filter(p => p.tags.includes('LinkedIn') || p.category === 'LinkedIn Marketing').slice(0, 2);
    } else if (id === 'content-creation') {
      return blogPosts.filter(p => p.tags.includes('SEO') || p.category === 'Content Marketing').slice(0, 2);
    } else {
      return blogPosts.filter(p => p.tags.includes('Church Growth') || p.category === 'Ministry Technology').slice(0, 2);
    }
  };

  const relatedPosts = getRelatedPosts();

  // Service-specific FAQs
  const serviceFaqs = [
    {
      question: `How quickly will I see results from ${service?.title}?`,
      answer: `Most clients see significant improvements within 30-60 days. We focus on quick wins while building long-term sustainable growth.`
    },
    {
      question: `What's included in the ${service?.pricing} package?`,
      answer: `Our packages include all the features listed above, plus dedicated account management, regular reporting, and strategy calls.`
    }
  ];

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <Link to="/services">
              <Button>View All Services</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const IconComponent = iconComponents[service.icon];

  return (
    <Layout>
      <SEOHead
        title={service.title}
        description={service.description}
        keywords={`${service.title}, ${service.features.slice(0, 3).join(', ')}, Nigeria, Lagos`}
        image={service.image}
      />
      <ServiceSchema service={service} />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.title, path: `/services/${service.id}` }
      ]} />
      <FAQSchema faqItems={serviceFaqs} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${service.color}10` }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <div style={{ color: service.color }}>
                  <IconComponent />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {service.description}
              </p>
              <p className="text-2xl font-bold text-white mb-8">
                {service.pricing}
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-3xl blur-2xl" />
              <img
                src={service.image}
                alt={service.title}
                className="relative rounded-3xl w-full aspect-[4/3] object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Does This Sound Familiar?
            </h2>
            <p className="text-lg text-gray-600">
              If you're experiencing any of these, you're not alone—and we can help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.painPoints.map((pain, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white rounded-xl border border-red-200"
              >
                <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold">{index + 1}</span>
                </span>
                <p className="text-gray-700 font-medium">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to transform your digital presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-6 bg-gray-50 rounded-xl"
              >
                <Check className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Results You Can Expect
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-lg text-gray-900 font-semibold">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
              <Link to="/blog" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="flex gap-6 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-32 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <span className="text-emerald-600 text-sm font-medium">{post.category}</span>
                    <h3 className="font-bold text-gray-900 mt-1 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">{post.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book a free strategy call and let's discuss how we can help you grow.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-10 py-6 text-lg rounded-xl"
            >
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explore Our Other Services
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {otherServices.map((s) => {
              const OtherIcon = iconComponents[s.icon];
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all group"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${s.color}15` }}
                  >
                    <div style={{ color: s.color }}>
                      <OtherIcon />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-500">{s.shortDesc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
