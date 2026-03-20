import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './index';
import authService from '../../services/AuthService';

/**
 * Role-Based Navigation Component
 * Provides different navigation options based on user authentication status and role
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load user data on mount and auth change
  useEffect(() => {
    const loadUser = () => {
      const currentUser = authService.getCurrentUserInfo();
      setUser(currentUser);
    };

    loadUser();

    // Listen for auth changes (you might want to add this to AuthService)
    const interval = setInterval(loadUser, 1000);
    return () => clearInterval(interval);
  }, [location]);

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    navigate('/Login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Navigation items for different user roles
  const getNavItems = () => {
    const items = [];

    // Public items (always visible)
    items.push({
      path: '/public',
      label: 'คอร์สสาธารณะ',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      show: true
    });

    // Authenticated user items
    if (user) {
      items.push({
        path: '/Course',
        label: 'คอร์สของฉัน',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        ),
        show: true
      });

      items.push({
        path: '/Profile',
        label: 'โปรไฟล์',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
        show: true
      });

      // Admin-only items
      if (user.isAdmin()) {
        items.push({
          path: '/admin',
          label: 'แดชบอร์ดผู้ดูแล',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          show: true
        });
      }
    }

    return items.filter(item => item.show);
  };

  const navItems = getNavItems();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              <span>LMS1000</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(item.path)
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  สวัสดี, {user.getDisplayName()}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                >
                  ออกจากระบบ
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/Login">
                  <Button variant="outline" size="sm">
                    เข้าสู่ระบบ
                  </Button>
                </Link>
                <Link to="/Login">
                  <Button size="sm">
                    สมัครสมาชิก
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            >
              <span className="sr-only">เปิดเมนู</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 border-t border-gray-200' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActiveRoute(item.path)
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile Auth Actions */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              {user ? (
                <div className="px-3 space-y-3">
                  <div className="text-sm text-gray-700">
                    สวัสดี, {user.getDisplayName()}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="w-full"
                  >
                    ออกจากระบบ
                  </Button>
                </div>
              ) : (
                <div className="px-3 space-y-3">
                  <Link to="/Login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      เข้าสู่ระบบ
                    </Button>
                  </Link>
                  <Link to="/Login" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full">
                      สมัครสมาชิก
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
