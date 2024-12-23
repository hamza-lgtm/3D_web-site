'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Logo3D from '@/components/Logo3D';
import { Suspense } from 'react';
import Image from 'next/image';
// import { color, fog, ambientLight } from '@react-three/drei';

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <motion.div 
    className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-white/90">{title}</h3>
    <p className="text-white/70">{description}</p>
  </motion.div>
);

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div>
      {/* Hero Section with Logo3D */}
      <div className=" z-20 min-h-[60vh]">
        

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] text-center px-4 pt-8">
          <motion.h1 
            className="text-6xl font-bold mb-3 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Sniper AI
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-4 max-w-2xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Next generation artificial intelligence technology
          </motion.p>
          
          <motion.button
            className="px-8 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get Started
          </motion.button>
        </div>
        

        <div >
        <Logo3D  />
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-20 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-white/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🎯"
              title="Precision Targeting"
              description="Advanced AI algorithms for precise target identification and tracking"
            />
            <FeatureCard 
              icon="🔒"
              title="Secure Platform"
              description="Enterprise-grade security with end-to-end encryption"
            />
            <FeatureCard 
              icon="⚡"
              title="Real-time Processing"
              description="Lightning-fast processing for immediate results"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-20 py-20 px-4 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "99%", label: "Accuracy" },
              { number: "24/7", label: "Support" },
              { number: "100+", label: "Clients" },
              { number: "50ms", label: "Response Time" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6"
              >
                <div className="text-4xl font-bold text-white/90 mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="relative z-20 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-white/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Technology Stack
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "React", icon: "/images/react.svg" },
              { name: "Python", icon: "/images/python.svg" },
              { name: "TensorFlow", icon: "/images/tensorflow.svg" },
              { name: "AWS", icon: "/images/aws.svg" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 mb-4 relative">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain filter invert"
                  />
                </div>
                <div className="text-white/80">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-20 py-20 px-4 bg-white/5 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-8 text-white/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Get Started?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-12 text-white/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join the next generation of AI technology today
          </motion.p>
          
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold hover:scale-105 transition-transform"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button>
        </div>
      </section>
    </div>
  );
}
