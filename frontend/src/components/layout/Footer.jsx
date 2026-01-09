import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { companyInfo, services, navLinks } from '../../data/mock';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Get Growth Tips in Your Inbox
              </h3>
              <p className="text-gray-400">
                Weekly insights on digital marketing, content strategy, and business growth for Nigerian entrepreneurs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 w-full sm:w-72 h-12"
              />
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 h-12 whitespace-nowrap">
                Subscribe <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src={companyInfo.logo}
                alt={companyInfo.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <span className="font-bold text-xl">
                Dependify<span className="text-emerald-500">.ng</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering Nigerian businesses and ministries with digital solutions that drive real growth.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: companyInfo.socialLinks.linkedin },
                { icon: Twitter, href: companyInfo.socialLinks.twitter },
                { icon: Instagram, href: companyInfo.socialLinks.instagram },
                { icon: Facebook, href: companyInfo.socialLinks.facebook },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.title.split(' ').slice(0, 3).join(' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  {companyInfo.address}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
            <p>© {currentYear} Dependify LLC Nigeria. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
