import React from 'react';
import Navbar from './Navbar';

/**
 * Main Layout Component
 * Provides consistent layout structure with navbar and proper spacing
 */
const MainLayout = ({ children, showNavbar = true }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="bg-animated-mesh" />
      <div className="blob top-[-10%] left-[-10%]" />
      <div className="blob bottom-[-10%] right-[-10%] bg-green-400/5" />
      <div className="blob top-[40%] right-[10%] bg-indigo-400/5" />
      
      {showNavbar && <Navbar />}
      
      {/* Main content with proper spacing for fixed navbar */}
      <main className={`relative z-10 ${showNavbar ? 'pt-16' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
