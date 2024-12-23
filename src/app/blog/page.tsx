'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Cybersecurity",
    excerpt: "Exploring how artificial intelligence is revolutionizing the cybersecurity landscape",
    content: "Artificial Intelligence is transforming the way we approach cybersecurity...",
    image: "/images/blog/ai-security.jpg",
    category: "Technology",
    date: "Dec 18, 2023",
    readTime: "5 min read",
    author: {
      name: "John Smith",
      avatar: "/images/profile.avif"
    }
  },
  {
    id: 2,
    title: "Machine Learning Breakthroughs",
    excerpt: "Recent advancements in machine learning and their impact on industry",
    content: "The field of machine learning continues to evolve at an unprecedented pace...",
    image: "/images/blog/ml-breakthroughs.jpg",
    category: "AI",
    date: "Dec 15, 2023",
    readTime: "7 min read",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/profile.avif"
    }
  },
  {
    id: 3,
    title: "Neural Networks Explained",
    excerpt: "A deep dive into the architecture and applications of neural networks",
    content: "Neural networks form the backbone of modern artificial intelligence...",
    image: "/images/blog/neural-networks.jpg",
    category: "Deep Learning",
    date: "Dec 12, 2023",
    readTime: "10 min read",
    author: {
      name: "Mike Chen",
      avatar: "/images/profile.avif"
    }
  },
  {
    id: 4,
    title: "ChatGPT: The Future of Natural Language Processing",
    excerpt: "An overview of ChatGPT and its potential impact on the natural language processing industry",
    content: "ChatGPT is a cutting-edge language model that has revolutionized natural language processing...",
    image: "/images/blog/chatgpt.jpg",
    category: "Natural Language Processing",
    date: "Dec 10, 2023",
    readTime: "8 min read",
    author: {
      name: "Emily Davis",
      avatar: "/images/profile.avif"
    }
  }
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.div
      className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="px-2 py-1 bg-primary/80 text-white text-sm rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative h-10 w-10">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-white/90 font-medium">{post.author.name}</p>
            <div className="flex items-center text-white/60 text-sm">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white/90 mb-2">
          {post.title}
        </h3>
        <p className="text-white/70 mb-4">
          {post.excerpt}
        </p>
        <Link 
          href={`/blog/${post.id}`}
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          Read More
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(blogPosts.map(post => post.category))
  );

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden  pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white/90 text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Latest Insights & News
          </motion.h1>
          <motion.p
            className="text-xl text-white/70 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Stay updated with the latest developments in AI technology and cybersecurity
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder-white/50 focus:outline-none focus:border-primary"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
