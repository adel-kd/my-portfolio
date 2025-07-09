import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

// Custom logo component with "ADEL" and slogan
const Logo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-xl">A</span>
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
        ADEL
      </span>
      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium -mt-1">
        full stack full impact
      </span>
    </div>
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { newBlogCount, clearBlogNotifications } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blog', href: '/blog', special: true },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavigation = (item) => {
    // Clear blog notifications when navigating to blog
    if (item.href === '/blog') {
      clearBlogNotifications();
    }
    
    if (item.href.startsWith('#')) {
      // If we're not on the main page, navigate to main page first
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(item.href);
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      const element = document.querySelector('#home');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button onClick={handleLogoClick}>
            <Logo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.special ? (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className="relative group"
                >
                  <div className="relative px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none">
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  {newBlogCount > 0 ? (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce min-w-[20px] text-center">
                      {newBlogCount > 9 ? '9+' : newBlogCount}
                    </div>
                  ) : (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                      HOT
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 blur-sm group-hover:blur-md transition-all duration-300"></div>
                </button>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {item.name}
                </button>
              )
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                item.special ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    className="relative group text-left"
                  >
                    <div className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-lg shadow-lg">
                      <span className="mr-2">{item.name}</span>
                      {newBlogCount > 0 ? (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce min-w-[20px] text-center">
                          {newBlogCount > 9 ? '9+' : newBlogCount}
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                          HOT
                        </span>
                      )}
                    </div>
                  </button>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-left"
                  >
                    {item.name}
                  </button>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;