import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Send, Clock, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { companyInfo, services, blogPosts } from '../data/mock';
import { toast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';
import SEOHead from '../components/seo/SEOHead';
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from '../components/seo/StructuredData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const recentPosts = blogPosts.slice(0, 2);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please describe your goals';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim() || null,
          service: formData.service,
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to submit form');
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleServiceChange = (value) => {
    setFormData({ ...formData, service: value });
    if (errors.service) {
      setErrors({ ...errors, service: null });
    }
  };

  // Error message component
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <Layout>
        <SEOHead
          title="Thank You - Message Received"
          description="Thank you for contacting Dependify LLC Nigeria. We'll get back to you within 24 hours."
          noindex={true}
        />
        <section className="pt-32 pb-20 min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We've received your message and will get back to you within 24 hours.
              Check your email for a confirmation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 rounded-xl"
                >
                  Back to Home
                </Button>
              </Link>
              <Link to="/blog">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-white hover:bg-white/10 font-semibold px-8 rounded-xl"
                >
                  Read Our Blog
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <Toaster />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Contact Us - Get Free Digital Marketing Consultation"
        description="Book a free strategy session with Dependify LLC Nigeria. Get expert advice on LinkedIn optimization, content marketing, and church CRM solutions for your Nigerian business."
        keywords="contact Dependify, free consultation Nigeria, digital marketing Lagos, LinkedIn help Nigeria"
      />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' }
      ]} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Let's Discuss Your{' '}
              <span className="text-emerald-400">Growth</span>
            </h1>
            <p className="text-xl text-gray-300">
              Book a free strategy session and discover how we can help you dominate your market.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Cards */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                <a
                  href="tel:+234-806-049-6697"
                  className="text-gray-300 hover:text-emerald-400 transition-colors block"
                >
                  +234-806-049-6697
                </a>
                <a
                  href="tel:+234-803-914-8736"
                  className="text-gray-300 hover:text-emerald-400 transition-colors block mt-1"
                >
                  +234-803-914-8736
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/2349040007770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  +234-904-000-7770
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
                <p className="text-gray-300">We typically respond within 24 hours</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Book Your Free Strategy Session
                </h2>
                <p className="text-gray-500 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`h-12 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      <ErrorMessage error={errors.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`h-12 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      <ErrorMessage error={errors.email} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`h-12 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      <ErrorMessage error={errors.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your company name (optional)"
                        value={formData.company}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interested In <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.service}
                      onValueChange={handleServiceChange}
                    >
                      <SelectTrigger className={`h-12 ${errors.service ? 'border-red-500 focus:ring-red-500' : ''}`}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                    <ErrorMessage error={errors.service} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell Us About Your Goals <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="What challenges are you facing? What results do you want to achieve?"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    <ErrorMessage error={errors.message} />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-6 text-lg rounded-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Request Free Strategy Session
                        <Send className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    By submitting, you agree to our privacy policy. We'll never share your information.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">While You Wait, Read Our Latest</h2>
            <Link to="/blog" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="flex gap-6 p-6 bg-white rounded-xl hover:shadow-lg transition-shadow group"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-32 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <span className="text-emerald-600 text-sm font-medium">{post.category}</span>
                  <h3 className="font-bold text-gray-900 mt-1 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{post.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Toaster />
    </Layout>
  );
};

export default Contact;

