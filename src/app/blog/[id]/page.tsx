'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

const blogPost: BlogPost = {
  id: 1,
  title: "The Future of AI in Cybersecurity",
  content: `
    <p>Artificial Intelligence is revolutionizing the cybersecurity landscape in unprecedented ways. As cyber threats become increasingly sophisticated, AI-powered solutions are emerging as crucial tools in the fight against cybercrime.</p>

    <h2>The Role of AI in Threat Detection</h2>
    <p>Modern AI systems can analyze patterns of network traffic and user behavior to identify potential threats before they materialize. Machine learning algorithms can process vast amounts of data in real-time, detecting anomalies that might indicate a security breach.</p>

    <h2>Predictive Security Measures</h2>
    <p>One of the most promising applications of AI in cybersecurity is its ability to predict and prevent attacks before they occur. By analyzing historical data and current trends, AI systems can identify potential vulnerabilities and suggest preemptive measures.</p>

    <h2>Automated Response Systems</h2>
    <p>When a threat is detected, AI-powered systems can respond automatically, implementing security measures to protect sensitive data and systems. This rapid response capability is crucial in minimizing damage from cyber attacks.</p>

    <h2>The Future Outlook</h2>
    <p>As AI technology continues to evolve, we can expect to see even more sophisticated applications in cybersecurity. From advanced threat detection to automated incident response, AI will play an increasingly important role in protecting our digital assets.</p>
  `,
  image: "/images/blog/ai-security.jpg",
  category: "Technology",
  date: "Dec 18, 2023",
  readTime: "5 min read",
  author: {
    name: "John Smith",
    avatar: "/images/blog/authors/john.jpg",
    bio: "John Smith is a cybersecurity expert with over 10 years of experience in AI and machine learning applications in security."
  }
};

const BlogPostPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4">
            <motion.span
              className="inline-block px-3 py-1 bg-primary/80 text-white text-sm rounded-full mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {blogPost.category}
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {blogPost.title}
            </motion.h1>
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative h-12 w-12">
                <Image
                  src={blogPost.author.avatar}
                  alt={blogPost.author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-medium">{blogPost.author.name}</p>
                <div className="flex items-center text-white/60 text-sm">
                  <span>{blogPost.date}</span>
                  <span className="mx-2">•</span>
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          {/* Author Bio */}
          <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-start space-x-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={blogPost.author.avatar}
                  alt={blogPost.author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  About {blogPost.author.name}
                </h3>
                <p className="text-white/70">
                  {blogPost.author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 flex justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default BlogPostPage;
