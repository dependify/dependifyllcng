import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Calendar, Tag, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { blogPosts, services } from '../data/mock';
import SEOHead from '../components/seo/SEOHead';
import { OrganizationSchema, WebsiteSchema, BreadcrumbSchema } from '../components/seo/StructuredData';

const Blog = () => {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <Layout>
      <SEOHead
        title="Digital Marketing Blog for Nigerian Businesses"
        description="Expert insights on LinkedIn marketing, SEO, content strategy, and church technology for Nigerian businesses. Learn proven strategies to grow your business online."
        keywords="digital marketing Nigeria blog, LinkedIn tips Nigeria, SEO guide Nigeria, content marketing Africa, church technology, Nigerian business growth"
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' }
      ]} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            Insights & Strategies
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Nigerian Business{' '}
            <span className="text-emerald-400">Growth Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proven digital marketing strategies, LinkedIn tips, and growth insights 
            specifically for Nigerian businesses and ministries.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
          
          <Link to={`/blog/${featuredPost.slug}`} className="group">
            <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-3xl overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.publishedDate).toLocaleDateString('en-NG', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.image}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{featuredPost.author.name}</p>
                      <p className="text-sm text-gray-500">Author</p>
                    </div>
                  </div>
                  
                  <span className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-gray-700 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedDate).toLocaleDateString('en-NG', { 
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700">{post.author.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Implement These Strategies?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Stop reading and start growing. Book a free strategy session today.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg rounded-xl"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{service.shortDesc}</p>
                <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
