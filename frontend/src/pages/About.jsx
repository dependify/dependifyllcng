import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Shield, ArrowRight, Users, Award, Zap, Linkedin, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { aboutContent, stats, companyInfo, blogPosts } from '../data/mock';
import SEOHead from '../components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../components/seo/StructuredData';

const About = () => {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <Layout>
      <SEOHead
        title="About Us - Nigeria's Digital Growth Experts"
        description="Meet Tolulope Omotosho and the Dependify team. 15+ years experience helping Nigerian businesses grow through LinkedIn marketing, content creation, and digital transformation."
        keywords="Tolulope Omotosho, Dependify Nigeria, digital marketing agency Lagos, about Dependify, Nigerian marketing experts"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' }
      ]} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                About Us
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Built by Nigerians,{' '}
                <span className="text-emerald-400">For Nigerians</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {aboutContent.story}
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 rounded-xl"
                >
                  Work With Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4">
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-3xl p-10">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{aboutContent.mission}</p>
            </div>
            <div className="bg-amber-50 rounded-3xl p-10">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{aboutContent.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.values.map((value, index) => {
              const icons = [Award, Users, Shield, Heart];
              const Icon = icons[index];
              const bgColors = ['bg-emerald-100', 'bg-blue-100', 'bg-purple-100', 'bg-amber-100'];
              const textColors = ['text-emerald-600', 'text-blue-600', 'text-purple-600', 'text-amber-600'];
              
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${bgColors[index]} flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${textColors[index]}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team - Featured CEO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-lg text-gray-600">The experts behind your growth.</p>
          </div>

          {/* CEO Featured */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-full blur-lg opacity-30" />
                  <img
                    src={aboutContent.team[0].image}
                    alt="Tolulope Omotosho - CEO & Founder"
                    className="relative w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Tolulope Omotosho</h3>
                  <p className="text-emerald-600 font-semibold mb-4">CEO & Founder</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    With over 15 years of experience in digital marketing, Tolulope founded Dependify to help Nigerian businesses 
                    compete on the global stage. His passion for empowering African entrepreneurs drives everything we do. 
                    Under his leadership, Dependify has helped 500+ businesses generate over ₦2.5 billion in revenue.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/tolulopeomotosho/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-xl font-semibold hover:bg-[#006396] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    Connect on LinkedIn
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Other Team Members */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {aboutContent.team.slice(1).map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-xl group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm mb-4">{member.bio}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0077B5] transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">From Our Blog</h2>
            <Link to="/blog" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
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
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can help you achieve your goals.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-10 py-6 text-lg rounded-xl"
            >
              Start the Conversation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
