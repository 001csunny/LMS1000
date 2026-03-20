import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './index';
import authService from '../../services/AuthService';
import { 
  BookOpen, 
  User, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Trophy,
  ShieldCheck,
  Compass
} from 'lucide-react';

/**
 * Bright Liquid Glass Navbar
 * Consistent premium navigation across the platform
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadUser = () => {
      const info = authService.getCurrentUserInfo();
      setUserData(info);
    };

    loadUser();
    const interval = setInterval(loadUser, 2000);
    return () => clearInterval(interval);
  }, [location]);

  const handleLogout = async () => {
    await authService.logout();
    setUserData(null);
    navigate('/Login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      path: '/public',
      label: 'Public Courses',
      icon: <Compass className="w-5 h-5" />,
      show: true
    },
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      show: !!userData
    },
    {
      path: '/Course',
      label: 'My Learning',
      icon: <BookOpen className="w-5 h-5" />,
      show: !!userData
    },
    {
      path: '/Profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      show: !!userData
    },
    {
      path: '/admin',
      label: 'Admin',
      icon: <ShieldCheck className="w-5 h-5" />,
      show: userData?.isAdmin()
    }
  ].filter(item => item.show);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
      isScrolled 
        ? 'py-2 px-4' 
        : 'py-4 px-6'
    }`}>
      <div className={`max-w-7xl mx-auto rounded-3xl transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/60 backdrop-blur-2xl border border-white/80 shadow-2xl shadow-blue-900/10 px-6' 
          : 'bg-white/30 backdrop-blur-md border border-white/40 px-8'
      }`}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
              ThaiLearner
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-4 border-l border-white/40 ml-4 pl-4">
            {userData ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Link to="/Login">
                <Button size="sm">Get Started</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-2xl bg-white/50 border border-white/60 text-gray-700 hover:bg-white/80 transition-all"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-[500px] opacity-100 py-6 border-t border-white/40' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all font-bold ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-white/40 px-2 text-center">
              {userData ? (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleLogout}
                  className="w-full text-red-500 border-red-100 hover:bg-red-50"
                >
                  Logout Account
                </Button>
              ) : (
                <Link to="/Login" onClick={() => setIsMenuOpen(false)}>
                  <Button size="lg" className="w-full">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
