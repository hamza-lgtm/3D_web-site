import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

const Header3D = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  const glowVariants = {
    initial: { scale: 0.8, opacity: 0 },
    hover: {
      scale: 1.2,
      opacity: 0.8,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <nav className="max-w-7xl mx-auto">
        <ul className="flex justify-center items-center space-x-8">
          {navItems.map((item, i) => (
            <motion.li
              key={item.href}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="relative"
              onHoverStart={() => setHoveredItem(item.href)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <Link href={item.href}>
                <motion.div
                  className={`px-4 py-2 rounded-full text-lg font-medium transition-colors relative z-10 ${
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-white/80 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      layoutId="activeIndicator"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </Link>

              {/* Glow effect */}
              <AnimatePresence>
                {hoveredItem === item.href && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg -z-10"
                    variants={glowVariants}
                    initial="initial"
                    animate="hover"
                    exit="initial"
                  />
                )}
              </AnimatePresence>

              {/* 3D floating particles */}
              <AnimatePresence>
                {hoveredItem === item.href && (
                  <>
                    {[...Array(3)].map((_, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-2 h-2 bg-primary/30 rounded-full"
                        initial={{
                          opacity: 0,
                          scale: 0,
                          x: 0,
                          y: 0,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: Math.random() * 40 - 20,
                          y: Math.random() * 40 - 20,
                        }}
                        transition={{
                          duration: 1,
                          delay: index * 0.2,
                          repeat: Infinity,
                          repeatType: 'loop',
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Decorative elements */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16">
        <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-primary/50 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
      </div>
    </motion.header>
  );
};

export default Header3D;
