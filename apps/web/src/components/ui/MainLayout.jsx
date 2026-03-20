import React from 'react';
import Navbar from './Navbar';

/**
 * Main Layout Component
 * Provides consistent layout structure with navbar and proper spacing
 */
const MainLayout = ({ children, showNavbar = true }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      
      {/* Main content with proper spacing for fixed navbar */}
      <main className={`${showNavbar ? 'pt-16' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
