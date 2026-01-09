import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Linkedin, FileText, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { services } from '../../data/mock';

const iconComponents = {
  Linkedin: () => (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  FileText: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
};

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-6">
            Our Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Three Powerful Ways to{' '}
            <span className="text-emerald-500">Grow Your Business</span>
          </h2>
          <p className="text-xl text-gray-600">
            Specialized solutions for Nigerian businesses, consultants, and ministries.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service, index) => {
            const IconComponent = iconComponents[service.icon];
            return (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeService === index
                    ? 'bg-gray-900 text-white shadow-xl scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div style={{ color: activeService === index ? service.color : 'inherit' }}>
                  <IconComponent />
                </div>
                <span className="hidden sm:inline">
                  {service.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Service Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {services[activeService].pricing}
                    </p>
                  </div>
                  <Link to={`/services/${services[activeService].id}`}>
                    <Button
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${services[activeService].color}15` }}
            >
              <div style={{ color: services[activeService].color }}>
                {iconComponents[services[activeService].icon]()}
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {services[activeService].title}
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {services[activeService].description}
            </p>

            {/* Pain Points */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Does this sound like you?</h4>
              <ul className="space-y-3">
                {services[activeService].painPoints.map((pain, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                    </span>
                    {pain}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">What you'll get:</h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {services[activeService].benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-6 text-lg rounded-xl"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
