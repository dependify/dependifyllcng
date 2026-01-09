import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, Clock, Shield } from 'lucide-react';
import { Button } from '../ui/button';

const FinalCTA = () => {
  const benefits = [
    { icon: Zap, text: "Results in 30 days or less" },
    { icon: Clock, text: "Done-for-you implementation" },
    { icon: Shield, text: "No long-term contracts" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900">
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-sm font-medium">
            Limited Availability — Only 5 Spots This Month
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Stop Losing Clients<br />
          and Start <span className="text-emerald-400">Dominating</span> Your Market?
        </h2>

        {/* Subheadline */}
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Join 500+ Nigerian businesses that stopped struggling and started growing.
          Your free strategy session is waiting.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {benefits.map(({ icon: Icon, text }, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-300"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-10 py-7 text-xl rounded-xl shadow-2xl shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 hover:scale-105 w-full sm:w-auto"
            >
              Claim Your Free Strategy Session
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Risk Reversal */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-gray-300">
            100% Free. No credit card. No obligations.
          </span>
        </div>

        {/* Urgency */}
        <p className="mt-8 text-gray-500">
          ⚡ Average time to first results: <span className="text-white font-semibold">21 days</span>
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
