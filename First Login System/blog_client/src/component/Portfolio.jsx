// app/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaJava, FaDatabase, FaMobile, FaCode, FaGraduationCap, FaBriefcase, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaDownload, FaArrowRight, FaRocket } from 'react-icons/fa';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorRef = useRef(null);

  // Update cursor position
  useEffect(() => {
    const mouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', mouseMove);
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor variants
  const cursorVariants = {
    default: {
      x: cursorPosition.x - 12,
      y: cursorPosition.y - 12,
      backgroundColor: darkMode ? '#4f46e5' : '#3b82f6',
      scale: 1,
      mixBlendMode: darkMode ? 'normal' : 'difference'
    },
    text: {
      height: 80,
      width: 80,
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
      backgroundColor: '#f59e0b',
      scale: 1.2
    },
    button: {
      height: 60,
      width: 60,
      x: cursorPosition.x - 30,
      y: cursorPosition.y - 30,
      backgroundColor: '#10b981',
      scale: 1.5
    }
  };

  // Nav items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  // Skills data
  const skills = [
    { name: 'HTML/CSS', level: 95, icon: <FaCode />, color: 'from-cyan-500 to-blue-500' },
    { name: 'JavaScript', level: 90, icon: <FaCode />, color: 'from-yellow-400 to-yellow-600' },
    { name: 'React', level: 92, icon: <FaReact />, color: 'from-blue-400 to-cyan-500' },
    { name: 'Node.js', level: 90, icon: <FaNodeJs />, color: 'from-green-500 to-emerald-600' },
    { name: 'Python', level: 85, icon: <FaPython />, color: 'from-blue-600 to-indigo-700' },
    { name: 'Java', level: 80, icon: <FaJava />, color: 'from-red-500 to-orange-500' },
    { name: 'MongoDB', level: 87, icon: <FaDatabase />, color: 'from-green-600 to-lime-500' },
    { name: 'React Native', level: 90, icon: <FaMobile />, color: 'from-purple-500 to-fuchsia-600' },
  ];

  // Projects data
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce platform with payment integration and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      color: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Fitness Tracker App',
      description: 'Cross-platform fitness application with workout tracking and progress analytics.',
      technologies: ['Flutter', 'Firebase', 'Dart'],
      color: 'from-green-400 to-teal-500'
    },
    {
      title: 'Business Analytics Dashboard',
      description: 'Real-time business analytics dashboard with data visualization and reporting.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'MySQL'],
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'AI Content Generator',
      description: 'AI-powered content generation platform with NLP and machine learning.',
      technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      color: 'from-amber-500 to-orange-500'
    }
  ];

  // Floating shapes
  const FloatingShapes = () => {
    const colors = darkMode 
      ? ['#4f46e5', '#7c3aed', '#8b5cf6', '#a78bfa'] 
      : ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              backgroundColor: colors[i % colors.length],
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Theme switcher
  const ThemeSwitcher = ({ fullWidth }) => {
    return (
      <motion.button 
        onClick={() => setDarkMode(!darkMode)}
        className={`${fullWidth ? 'w-full text-left px-3 py-2' : 'p-2'} rounded-full ${darkMode ? 'bg-amber-500' : 'bg-blue-600'} text-white flex items-center justify-center`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? (
          <span className="flex items-center">
            <span className="mr-2">☀️</span>
            {fullWidth && 'Light Mode'}
          </span>
        ) : (
          <span className="flex items-center">
            <span className="mr-2">🌙</span>
            {fullWidth && 'Dark Mode'}
          </span>
        )}
      </motion.button>
    );
  };

  // Hover handlers for cursor
  const textEnter = () => setCursorVariant('text');
  const buttonEnter = () => setCursorVariant('button');
  const leave = () => setCursorVariant('default');

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'}`}>
      {/* Animated background */}
      <motion.div 
        className="fixed inset-0 -z-50"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: darkMode 
            ? 'linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #1e293b)'
            : 'linear-gradient(-45deg, #f0f4ff, #e6f7ff, #dbeafe, #d1f7ff)',
          backgroundSize: '400% 400%',
        }}
      />
      
      {/* Floating Shapes */}
      <FloatingShapes />
      
      {/* Custom Animated Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', mass: 0.1 }}
        style={{ width: 24, height: 24 }}
      />
      
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${darkMode ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-gradient-to-r from-blue-800/90 to-purple-900/90 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <motion.div 
                className="flex-shrink-0 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-2 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} shadow-lg`}>
                  <span className="font-bold text-white">F</span>
                </div>
                <span className="text-xl font-bold text-white">Faizan Ahmad</span>
              </motion.div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden group ${
                      activeSection === item.id 
                        ? 'text-white bg-blue-600' 
                        : 'text-blue-200 hover:text-white'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: navItems.indexOf(item) * 0.1 }}
                    onMouseEnter={textEnter}
                    onMouseLeave={leave}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full`}></span>
                  </motion.a>
                ))}
                <ThemeSwitcher />
              </div>
            </div>
            
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none"
                onMouseEnter={buttonEnter}
                onMouseLeave={leave}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-blue-900/95 backdrop-blur-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      activeSection === item.id 
                        ? 'text-white bg-blue-600' 
                        : 'text-blue-200 hover:text-white hover:bg-blue-700'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="px-3 py-2">
                  <ThemeSwitcher fullWidth />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onMouseEnter={textEnter}
                onMouseLeave={leave}
              >
                Hi, I'm <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  Faizan Ahmad
                </motion.span>
              </motion.h1>
              
              <motion.h2 
                className="text-2xl md:text-3xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold">
                  Full Stack Developer
                </span> 
                <span className="mx-2">|</span> 
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text font-bold">
                  MERN Stack Specialist
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Transforming ideas into reality with clean, efficient code and beautiful user experiences.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.a 
                  href="#contact" 
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg flex items-center group"
                  onMouseEnter={buttonEnter}
                  onMouseLeave={leave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hire Me 
                  <FaRocket className="ml-2 group-hover:animate-bounce" />
                </motion.a>
                
                <motion.a 
                  href="#about" 
                  className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg border border-blue-200 flex items-center group"
                  onMouseEnter={buttonEnter}
                  onMouseLeave={leave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More 
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-2 font-bold">FA</div>
                      <div className="text-xl">MERN Stack</div>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-400 to-orange-500 text-blue-900 font-bold py-2 px-4 rounded-lg shadow-lg"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                  }}
                >
                  <span>MS CS Graduate</span>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-6 -left-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-blue-800 font-bold py-2 px-4 rounded-lg shadow-lg"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4, 
                    delay: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <span>5+ Years Experience</span>
                </motion.div>
                
                <motion.div 
                  className="absolute top-20 -right-20 bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white py-2 px-4 rounded-lg shadow-lg"
                  animate={{ 
                    y: [0, -20, 0],
                    x: [0, -10, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    delay: 1,
                    ease: "easeInOut"
                  }}
                >
                  <span>Available for Work</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative pb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={textEnter}
            onMouseLeave={leave}
          >
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text">
              About Me
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></span>
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/3 flex justify-center"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div className="relative">
                <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-cyan-500 to-blue-600 relative">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <motion.div 
                        className="text-5xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6 }}
                      >
                        <FaCode />
                      </motion.div>
                      <h3 className="text-xl font-bold">Full Stack Developer</h3>
                      <p className="mt-2">Specializing in MERN Stack</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-6 rounded-lg shadow-lg">
                  <span>MS Computer Science</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Faizan Ahmad
                </span> 
                <span> - MERN Stack Developer</span>
              </h3>
              <p className="mb-6">
                I'm a passionate Full Stack Developer with expertise in MERN stack development. 
                Recently completed my MS in Computer Science from the University of Gujrat, 
                following my BS in Computer Science from the same university in 2023.
              </p>
              <p className="mb-6">
                I specialize in creating responsive, user-friendly web applications with clean 
                code and modern design principles. With a strong foundation in both frontend and 
                backend technologies, I deliver comprehensive solutions that meet client needs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Location:', value: 'Gujrat, Pakistan' },
                  { label: 'Degree:', value: 'MS Computer Science' },
                  { label: 'Email:', value: 'faizan@example.com' },
                  { label: 'Freelance:', value: 'Available' }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <strong>{item.label}</strong> {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  href="#" 
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg flex items-center group"
                  onMouseEnter={buttonEnter}
                  onMouseLeave={leave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV 
                  <FaDownload className="ml-2 group-hover:animate-bounce" />
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg border border-blue-200 flex items-center group"
                  onMouseEnter={buttonEnter}
                  onMouseLeave={leave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me 
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-cyan-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative pb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={textEnter}
            onMouseLeave={leave}
          >
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text">
              Technical Skills
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className={`p-6 rounded-2xl shadow-lg transition-all relative overflow-hidden group ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, y: 30, rotate: 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg mr-4 bg-gradient-to-r ${skill.color} text-white`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Proficiency</span>
                    <span className="font-bold text-blue-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className={`mt-16 rounded-2xl p-8 shadow-xl bg-gradient-to-r from-purple-600 to-pink-700 relative overflow-hidden`}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` 
            }}></div>
            <h3 className="text-xl font-bold text-white mb-6 relative z-10">Additional Expertise</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {['REST APIs', 'Git', 'UI/UX Design', 'Responsive Design', 'Firebase', 'Spring', 'Prompt Engineering', 'Security'].map((item, index) => (
                <motion.div 
                  key={item}
                  className="bg-white/10 backdrop-blur-sm text-white py-3 px-4 rounded-lg text-center border border-white/20 hover:bg-white/20 transition-all"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-2">
                    {index === 0 && <FaCode />}
                    {index === 1 && <FaGithub />}
                    {index === 2 && <FaBriefcase />}
                    {index === 3 && <FaMobile />}
                    {index === 4 && <FaCode />}
                    {index === 5 && <FaCode />}
                    {index === 6 && <FaCode />}
                    {index === 7 && <FaCode />}
                  </div>
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative pb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={textEnter}
            onMouseLeave={leave}
          >
            <span className="bg-gradient-to-r from-fuchsia-500 to-pink-600 text-transparent bg-clip-text">
              Featured Projects
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-fuchsia-500 to-pink-600 rounded-full"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={project.title}
                className={`overflow-hidden rounded-2xl shadow-lg group relative ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="h-48 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${project.color} flex items-center justify-center relative`}>
                    <div className="absolute inset-0 opacity-20" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` 
                    }}></div>
                    <div className="text-white text-center p-4 relative z-10">
                      <motion.div 
                        className="text-5xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6 }}
                      >
                        {index === 0 && <FaCode />}
                        {index === 1 && <FaMobile />}
                        {index === 2 && <FaDatabase />}
                        {index === 3 && <FaRocket />}
                      </motion.div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                      {project.technologies[0]}
                    </span>
                  </div>
                  <p className="mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.a 
              href="#" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg group"
              onMouseEnter={buttonEnter}
              onMouseLeave={leave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects <FaArrowRight className="ml-2 inline group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Education & Experience */}
      <section id="education" className={`py-20 relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 to-orange-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative pb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={textEnter}
            onMouseLeave={leave}
          >
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">
              Education & Experience
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></span>
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-12">
            {/* Education */}
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-emerald-600 mb-8 text-center md:text-left flex items-center">
                <FaGraduationCap className="mr-2" /> Education
              </h3>
              
              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-emerald-500 group">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-emerald-500 rounded-full transform -translate-x-1/2 group-hover:animate-pulse"></div>
                  <h4 className="text-xl font-bold">MS in Computer Science</h4>
                  <p className="text-emerald-500 font-medium">University of Gujrat</p>
                  <p className="text-gray-500">2023 - Recently Completed</p>
                  <p className="mt-2">
                    Specialized in advanced algorithms, machine learning, and cloud computing. 
                    Completed thesis on "Optimizing React Applications for Performance".
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-emerald-500 group">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-emerald-500 rounded-full transform -translate-x-1/2 group-hover:animate-pulse"></div>
                  <h4 className="text-xl font-bold">BS in Computer Science</h4>
                  <p className="text-emerald-500 font-medium">University of Gujrat</p>
                  <p className="text-gray-500">2019 - 2023</p>
                  <p className="mt-2">
                    Focused on software engineering principles, web development, and database systems. 
                    Graduated with honors.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Experience */}
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-amber-600 mb-8 text-center md:text-left flex items-center">
                <FaBriefcase className="mr-2" /> Experience
              </h3>
              
              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-amber-500 group">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-amber-500 rounded-full transform -translate-x-1/2 group-hover:animate-pulse"></div>
                  <h4 className="text-xl font-bold">Frontend Developer Intern</h4>
                  <p className="text-amber-500 font-medium">Kotla Software House</p>
                  <p className="text-gray-500">3 Months Internship</p>
                  <p className="mt-2">
                    Developed responsive user interfaces using React and Angular. 
                    Collaborated with UX designers to implement pixel-perfect designs.
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-amber-500 group">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-amber-500 rounded-full transform -translate-x-1/2 group-hover:animate-pulse"></div>
                  <h4 className="text-xl font-bold">Freelance Full Stack Developer</h4>
                  <p className="text-amber-500 font-medium">Self-Employed</p>
                  <p className="text-gray-500">2022 - Present</p>
                  <p className="mt-2">
                    Created web applications for international clients using MERN stack. 
                    Specialized in e-commerce solutions and custom web applications.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 relative ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative pb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={textEnter}
            onMouseLeave={leave}
          >
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Get In Touch
            </span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <FaEnvelope />, title: 'Email Me', text: 'faizan@example.com', action: 'Send Message', bg: 'from-cyan-500 to-blue-600' },
              { icon: <FaPhone />, title: 'Call Me', text: '+92 300 1234567', action: 'Call Now', bg: 'from-emerald-500 to-teal-600' },
              { icon: <FaMapMarkerAlt />, title: 'Location', text: 'Gujrat, Punjab, Pakistan', action: 'View Map', bg: 'from-amber-500 to-orange-600' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`p-8 rounded-2xl shadow-lg text-center relative overflow-hidden group ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'} text-blue-600 group-hover:text-white transition-colors`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="mb-4 group-hover:text-white transition-colors">{item.text}</p>
                  <a 
                    href="#" 
                    className="text-blue-600 font-medium hover:underline group-hover:text-white transition-colors"
                  >
                    {item.action}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className={`rounded-2xl shadow-xl p-8 relative overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute inset-0 opacity-5" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` 
            }}></div>
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text">
                Send a Message
              </span>
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { label: 'Your Email', type: 'email', placeholder: 'john@example.com' },
                { label: 'Subject', type: 'text', placeholder: 'Project Inquiry', full: true },
                { label: 'Message', type: 'textarea', placeholder: 'Your message here...', full: true }
              ].map((field, index) => (
                <motion.div 
                  key={index}
                  className={field.full ? 'md:col-span-2' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <label className="block mb-2 font-medium">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      rows={5} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                      placeholder={field.placeholder}
                    ></textarea>
                  ) : (
                    <input 
                      type={field.type} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                      placeholder={field.placeholder}
                    />
                  )}
                </motion.div>
              ))}
              
              <motion.div 
                className="md:col-span-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button 
                  type="submit" 
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-700 text-white font-bold rounded-full hover:from-purple-700 hover:to-pink-800 transition-all shadow-lg group"
                  onMouseEnter={buttonEnter}
                  onMouseLeave={leave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message <FaArrowRight className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 relative overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-900 to-purple-900 text-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <motion.h2 
                className="text-2xl font-bold flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-2 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} shadow-lg`}>
                  <span className="font-bold">F</span>
                </div>
                Faizan Ahmad
              </motion.h2>
              <motion.p 
                className="mt-2 opacity-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Full Stack Developer & MS CS Graduate
              </motion.p>
            </div>
            
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { icon: <FaGithub />, color: 'from-gray-700 to-gray-900' },
                { icon: <FaLinkedin />, color: 'from-blue-700 to-blue-900' },
                { icon: <FaTwitter />, color: 'from-cyan-500 to-blue-500' }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${social.color} text-white shadow-lg hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 360 }}
                  transition={{ type: 'spring' }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-blue-800 mt-8 pt-8 text-center opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p>&copy; {new Date().getFullYear()} Faizan Ahmad. All Rights Reserved.</p>
            <p className="mt-2">Designed for USA, UK, and Pakistan clients</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}