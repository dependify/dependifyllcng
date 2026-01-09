import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/mock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const FAQ = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-6">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Got Questions? <span className="text-emerald-500">We've Got Answers</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-xl px-6 data-[state=open]:shadow-lg data-[state=open]:border-emerald-200 transition-all"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-emerald-600 py-6 [&[data-state=open]]:text-emerald-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're happy to help.
          </p>
          <a
            href="mailto:hello@dependifyllc.com.ng"
            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            Contact us directly →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
