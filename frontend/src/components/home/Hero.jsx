import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { stats } from '../../data/mock';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const words = ['Visibility', 'Authority', 'Leads', 'Revenue'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">
                Nigeria's #1 Digital Growth Partner
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Stop Losing Clients to{' '}
              <span className="text-gray-400">Competitors</span>
              <br />
              <span className="relative">
                <span className="text-emerald-400">Dominate</span> Your Market with
              </span>
              <br />
              <span className="relative inline-block">
                <span
                  key={currentWord}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400 animate-fade-in"
                >
                  {words[currentWord]}
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-400 mb-8 leading-relaxed max-w-xl">
              We transform Nigerian businesses and ministries with LinkedIn optimization, 
              content creation, and digital tools that generate real leads and revenue—
              <span className="text-white font-medium">not just vanity metrics</span>.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-10">
              {['3X More Leads in 30 Days', 'Done-For-You Systems', 'Nigerian Market Experts'].map(
                (benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                )
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105 w-full sm:w-auto"
                >
                  Get Free Strategy Session
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-700 text-white hover:bg-white/5 font-semibold px-8 py-6 text-lg rounded-xl w-full sm:w-auto group"
              >
                <Play className="w-5 h-5 mr-2 text-emerald-400 group-hover:scale-110 transition-transform" />
                Watch How It Works
              </Button>
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-3xl blur-2xl" />
              
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Proven Results for Nigerian Businesses
                  </h3>
                  <p className="text-gray-400">
                    Real numbers. Real growth. Real impact.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl scale-95 group-hover:scale-100 transition-transform" />
                      <div className="relative p-6 text-center">
                        <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-center text-gray-500 text-sm mb-4">
                    Trusted by businesses across Nigeria
                  </p>
                  <div className="flex justify-center items-center gap-6 opacity-60">
                    <span className="text-white font-semibold">Lagos</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span className="text-white font-semibold">Abuja</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span className="text-white font-semibold">Port Harcourt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/40 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
