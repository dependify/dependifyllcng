import React from 'react';
import { Phone, Target, Rocket, TrendingUp } from 'lucide-react';
import { processSteps } from '../../data/mock';

const iconMap = {
  Phone,
  Target,
  Rocket,
  TrendingUp,
};

const Process = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            From Zero to <span className="text-emerald-400">Growth Hero</span> in 4 Steps
          </h2>
          <p className="text-xl text-gray-400">
            We've perfected a system that delivers results without demanding your time.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => {
            const IconComponent = iconMap[step.icon];
            return (
              <div
                key={step.step}
                className="relative group"
              >
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent z-0" />
                )}

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/30 hover:scale-105">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-bold">
                      {step.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-emerald-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-lg">
            Most clients start seeing results within{' '}
            <span className="text-emerald-400 font-semibold">30 days</span>.
            Some even faster.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;
