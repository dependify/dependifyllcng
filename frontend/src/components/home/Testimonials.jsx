import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/mock';
import { Button } from '../ui/button';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-6">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nigerian Businesses{' '}
            <span className="text-emerald-500">Winning Big</span>
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it. See what our clients have to say.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-3xl blur-2xl" />
          
          <div className="relative bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-24 h-24 text-emerald-500" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-full blur-md opacity-50" />
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow text-center md:text-left">
                {/* Stars */}
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-gray-900 font-medium leading-relaxed mb-6">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-gray-500">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                </div>

                {/* Result Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Result: {testimonials[activeIndex].result}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-gray-300 hover:border-emerald-500 hover:bg-emerald-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
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
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-gray-300 hover:border-emerald-500 hover:bg-emerald-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-emerald-50 border-emerald-200 scale-105'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-xs text-gray-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                "{testimonial.quote.substring(0, 80)}..."
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
