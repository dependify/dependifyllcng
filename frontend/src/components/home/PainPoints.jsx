import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, TrendingDown, Users, Eye } from 'lucide-react';
import { Button } from '../ui/button';

const painPoints = [
  {
    icon: Eye,
    title: "You're Invisible Online",
    description: "Your competitors are getting found. You're not. Every day, potential clients search for services you offer—and choose someone else.",
    stat: "78%",
    statLabel: "of Nigerian B2B buyers research online before buying"
  },
  {
    icon: TrendingDown,
    title: "Your Website is Costing You Money",
    description: "That outdated website isn't just ugly—it's actively losing you business. Visitors bounce in seconds, never to return.",
    stat: "53%",
    statLabel: "of visitors leave sites that take >3 seconds to load"
  },
  {
    icon: Users,
    title: "Quality Leads Are Going to Competitors",
    description: "While you chase cold prospects, competitors with optimized LinkedIn profiles are getting warm leads delivered daily.",
    stat: "80%",
    statLabel: "of B2B leads come from LinkedIn"
  },
  {
    icon: AlertTriangle,
    title: "You're Too Busy to Fix It",
    description: "You know you need better marketing. But between running your business and serving clients, who has time?",
    stat: "40+",
    statLabel: "hours/month spent on marketing by SMB owners"
  }
];

const PainPoints = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-6">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Is This <span className="text-red-500">Killing</span> Your Business?
          </h2>
          <p className="text-xl text-gray-600">
            If any of these sound familiar, you're leaving serious money on the table.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {painPoints.map((pain, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                <pain.icon className="w-7 h-7 text-red-500" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {pain.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {pain.description}
              </p>

              {/* Stat */}
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-red-500">
                  {pain.stat}
                </span>
                <span className="text-sm text-gray-500 pb-1">
                  {pain.statLabel}
                </span>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-8 sm:p-12 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              The Good News? <span className="text-emerald-500">We Fix This.</span>
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              In the next 30 days, you could be generating qualified leads while focusing on what you do best.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
              >
                Let's Talk About Your Growth
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
