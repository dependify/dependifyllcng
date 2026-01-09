import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag, Share2, Linkedin, Twitter, Facebook, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { blogPosts, services } from '../data/mock';
import SEOHead from '../components/seo/SEOHead';
import { BlogPostSchema, BreadcrumbSchema, OrganizationSchema } from '../components/seo/StructuredData';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <Link to="/blog">
              <Button>View All Articles</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedPosts = blogPosts.filter(p => 
    post.relatedPosts?.includes(p.slug) || 
    (p.category === post.category && p.id !== post.id)
  ).slice(0, 3);

  const shareUrl = `https://dependifyllc.com.ng/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <Layout>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        image={post.image}
        type="article"
        author={post.author.name}
        publishedTime={post.publishedDate}
        modifiedTime={post.modifiedDate}
        section={post.category}
        tags={post.tags}
      />
      <BlogPostSchema post={post} />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` }
      ]} />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedDate).toLocaleDateString('en-NG', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <a
              href={post.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
              />
              <div>
                <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-400">View LinkedIn Profile</p>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Share:</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#0077B5] transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#1DA1F2] transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#4267B2] transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative -mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[2/1] object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article 
              className="prose prose-lg prose-gray max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:my-6 prose-li:text-gray-600
                prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Tags */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white text-gray-600 text-sm rounded-full border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-emerald-600 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Need Help Implementing?</h3>
                <p className="text-emerald-100 text-sm mb-4">
                  Our team can help you put these strategies into action.
                </p>
                <Link to="/contact">
                  <Button className="w-full bg-white text-emerald-600 hover:bg-gray-100">
                    Get Free Consultation
                  </Button>
                </Link>
              </div>

              {/* Related Services */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Related Services</h3>
                <div className="space-y-3">
                  {services.slice(0, 2).map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                    >
                      <h4 className="font-medium text-gray-900 text-sm group-hover:text-emerald-600 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{service.pricing}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  About {post.author.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.author.name === 'Tolulope Omotosho' 
                    ? 'CEO & Founder of Dependify LLC Nigeria. 15+ years experience helping Nigerian businesses grow through strategic digital marketing. Passionate about empowering African entrepreneurs.'
                    : 'Digital marketing expert at Dependify LLC Nigeria, helping businesses achieve measurable growth through proven strategies.'
                  }
                </p>
                <a
                  href={post.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700"
                >
                  <Linkedin className="w-5 h-5" /> Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-emerald-600 text-sm font-medium">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 500+ Nigerian businesses already growing with Dependify.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 rounded-xl"
              >
                Get Started Today
              </Button>
            </Link>
            <Link to="/blog">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-xl"
              >
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
