import React, { useState } from 'react';
import { TrendingUp, Users, Target, BarChart3, Linkedin, FileText, Heart, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const statisticsData = [
  {
    id: 'linkedin',
    title: 'LinkedIn Optimization',
    icon: Linkedin,
    color: '#0077B5',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: 'Research-backed data on LinkedIn marketing effectiveness',
    source: 'LinkedIn Marketing Solutions, HubSpot Research 2024',
    stats: [
      { label: 'B2B leads from social media come from LinkedIn', value: '80%', trend: '+12% YoY' },
      { label: 'Higher engagement with optimized profiles', value: '40x', trend: 'vs unoptimized' },
      { label: 'Decision makers use LinkedIn for business', value: '75%', trend: 'C-suite executives' },
      { label: 'Increase in profile views with optimization', value: '300%', trend: 'within 30 days' },
    ],
    chartData: [
      { month: 'Before', leads: 5, views: 100 },
      { month: 'Month 1', leads: 12, views: 250 },
      { month: 'Month 2', leads: 18, views: 380 },
      { month: 'Month 3', leads: 25, views: 520 },
      { month: 'Month 4', leads: 32, views: 680 },
      { month: 'Month 5', leads: 38, views: 820 },
      { month: 'Month 6', leads: 45, views: 950 },
    ],
    roi: {
      investment: '₦15,000/month',
      avgDealValue: '₦500,000',
      conversionRate: '10%',
      monthlyLeads: '15-25',
      potentialROI: '3,300%'
    }
  },
  {
    id: 'content',
    title: 'Content Creation & SEO',
    icon: FileText,
    color: '#10B981',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    description: 'Data-driven insights on content marketing impact',
    source: 'Content Marketing Institute, Semrush 2024',
    stats: [
      { label: 'More leads generated vs traditional marketing', value: '3x', trend: 'at 62% less cost' },
      { label: 'Of buyers read 3-5 pieces before contacting sales', value: '47%', trend: 'B2B research' },
      { label: 'Higher conversion with consistent blogging', value: '6x', trend: 'vs non-bloggers' },
      { label: 'Organic traffic increase in 6 months', value: '434%', trend: 'with SEO strategy' },
    ],
    chartData: [
      { month: 'Month 1', traffic: 500, leads: 2 },
      { month: 'Month 2', traffic: 850, leads: 5 },
      { month: 'Month 3', traffic: 1400, leads: 9 },
      { month: 'Month 4', traffic: 2200, leads: 15 },
      { month: 'Month 5', traffic: 3500, leads: 24 },
      { month: 'Month 6', traffic: 5200, leads: 35 },
    ],
    roi: {
      investment: '₦50,000/month',
      avgDealValue: '₦750,000',
      conversionRate: '8%',
      monthlyLeads: '20-35',
      potentialROI: '1,200%'
    }
  },
  {
    id: 'church',
    title: 'Church CRM & Follow-up',
    icon: Heart,
    color: '#8B5CF6',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    description: 'Ministry technology adoption and retention statistics',
    source: 'Barna Group, Church Tech Today 2024',
    stats: [
      { label: 'New converts leave within 6 months without follow-up', value: '70%', trend: 'industry average' },
      { label: 'Retention rate with systematic follow-up', value: '85%', trend: '+50% improvement' },
      { label: 'Churches using CRM report better engagement', value: '92%', trend: 'member satisfaction' },
      { label: 'Reduction in admin time with automation', value: '60%', trend: 'staff efficiency' },
    ],
    chartData: [
      { month: 'Week 1', withCRM: 100, withoutCRM: 100 },
      { month: 'Week 2', withCRM: 95, withoutCRM: 75 },
      { month: 'Week 4', withCRM: 90, withoutCRM: 55 },
      { month: 'Week 8', withCRM: 87, withoutCRM: 40 },
      { month: 'Week 12', withCRM: 85, withoutCRM: 32 },
      { month: 'Week 24', withCRM: 82, withoutCRM: 28 },
    ],
    roi: {
      investment: '₦100,000/month',
      retentionImprovement: '+53%',
      timesSaved: '15 hrs/week',
      memberEngagement: '+40%',
      discipleshipCompletion: '85%'
    }
  }
];

const Statistics = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeData = statisticsData[activeIndex];
  const Icon = activeData.icon;

  const nextStat = () => {
    setActiveIndex((prev) => (prev + 1) % statisticsData.length);
  };

  const prevStat = () => {
    setActiveIndex((prev) => (prev - 1 + statisticsData.length) % statisticsData.length);
  };

  // Calculate max values for chart scaling
  const maxChartValue = Math.max(...activeData.chartData.map(d => 
    Math.max(...Object.values(d).filter(v => typeof v === 'number'))
  ));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-6">
            Research-Backed Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Data That Proves{' '}
            <span className="text-emerald-500">Real Impact</span>
          </h2>
          <p className="text-xl text-gray-600">
            Industry statistics and research data showing the proven effectiveness of our solutions.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {statisticsData.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  index === activeIndex
                    ? `${service.bgColor} ${service.borderColor} border-2 shadow-lg`
                    : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
                }`}
                style={index === activeIndex ? { color: service.color } : {}}
              >
                <ServiceIcon className="w-5 h-5" />
                {service.title}
              </button>
            );
          })}
        </div>

        {/* Main Statistics Display */}
        <div className="relative max-w-6xl mx-auto">
          <div className={`${activeData.bgColor} rounded-3xl p-8 md:p-12 border-2 ${activeData.borderColor}`}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: activeData.color }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{activeData.title}</h3>
                  <p className="text-gray-600">{activeData.description}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg">
                Source: {activeData.source}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {activeData.stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <span 
                      className="text-4xl font-bold"
                      style={{ color: activeData.color }}
                    >
                      {stat.value}
                    </span>
                    <span className="flex items-center text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Chart and ROI Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" style={{ color: activeData.color }} />
                  {activeData.id === 'church' ? 'Convert Retention Rate (%)' : 'Growth Trajectory'}
                </h4>
                <div className="h-64 flex items-end justify-between gap-2">
                  {activeData.chartData.map((data, index) => {
                    const primaryValue = activeData.id === 'linkedin' ? data.leads : 
                                        activeData.id === 'content' ? data.traffic :
                                        data.withCRM;
                    const secondaryValue = activeData.id === 'linkedin' ? data.views / 10 : 
                                          activeData.id === 'content' ? data.leads * 10 :
                                          data.withoutCRM;
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex gap-1 items-end h-48">
                          <div 
                            className="flex-1 rounded-t-lg transition-all duration-500"
                            style={{ 
                              height: `${(primaryValue / maxChartValue) * 100}%`,
                              backgroundColor: activeData.color,
                              minHeight: '8px'
                            }}
                          />
                          <div 
                            className="flex-1 rounded-t-lg transition-all duration-500 opacity-40"
                            style={{ 
                              height: `${(secondaryValue / maxChartValue) * 100}%`,
                              backgroundColor: activeData.color,
                              minHeight: '8px'
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 text-center">{data.month}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: activeData.color }} />
                    <span className="text-gray-600">
                      {activeData.id === 'linkedin' ? 'Leads' : 
                       activeData.id === 'content' ? 'Traffic' : 'With CRM'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded opacity-40" style={{ backgroundColor: activeData.color }} />
                    <span className="text-gray-600">
                      {activeData.id === 'linkedin' ? 'Profile Views' : 
                       activeData.id === 'content' ? 'Leads' : 'Without CRM'}
                    </span>
                  </div>
                </div>
              </div>

              {/* ROI Calculator */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" style={{ color: activeData.color }} />
                  ROI Breakdown
                </h4>
                <div className="space-y-4">
                  {Object.entries(activeData.roi).map(([key, value], index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span 
                        className="font-bold text-lg"
                        style={{ color: key.includes('ROI') || key.includes('Improvement') ? activeData.color : '#111827' }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: `${activeData.color}15` }}>
                  <p className="text-sm text-gray-700">
                    <strong>Key Insight:</strong> {
                      activeData.id === 'linkedin' 
                        ? 'Businesses with optimized LinkedIn profiles generate 80% of their B2B leads from the platform.'
                        : activeData.id === 'content'
                        ? 'Companies that blog consistently get 6x higher conversion rates than those that don\'t.'
                        : 'Churches using CRM systems retain 53% more new converts compared to manual follow-up methods.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevStat}
              className="w-12 h-12 rounded-full border-gray-300 hover:border-emerald-500 hover:bg-emerald-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              {statisticsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-emerald-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextStat}
              className="w-12 h-12 rounded-full border-gray-300 hover:border-emerald-500 hover:bg-emerald-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Ready to see these results for your business?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors"
          >
            Get Started Today
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
