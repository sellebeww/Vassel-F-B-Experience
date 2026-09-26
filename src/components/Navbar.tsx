import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Coffee, 
  Search, 
  ShoppingBag, 
  ArrowLeftRight, 
  Compass, 
  Menu as MenuIcon, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    experience, 
    setExperience, 
    activeNav, 
    setActiveNav, 
    cartCount, 
    setIsCartOpen, 
    setIsSearchOpen,
    toggleExperience
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFood = experience === 'food';

  const navLinks = isFood
    ? [
        { id: 'home', label: 'Home' },
        { id: 'menu', label: 'Menu' },
        { id: 'sets', label: 'Food Sets' },
        { id: 'popular', label: 'Popular' },
        { id: 'about', label: 'About' },
      ]
    : [
        { id: 'home', label: 'Home' },
        { id: 'menu', label: 'Drinks Menu' },
        { id: 'ritual', label: 'Matcha Ritual' },
        { id: 'about', label: 'Our Philosophy' },
      ];

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? isFood
            ? 'bg-[#1b1512]/90 backdrop-blur-md border-b border-[#362720] shadow-lg shadow-black/20 text-[#f5efe6]'
            : 'bg-[#121c16]/90 backdrop-blur-md border-b border-[#25392d] shadow-lg shadow-black/20 text-[#f3f7f4]'
          : isFood
          ? 'bg-gradient-to-b from-[#140e0b]/90 to-transparent text-[#f5efe6]'
          : 'bg-gradient-to-b from-[#0c1510]/90 to-transparent text-[#f3f7f4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Identity & Portal return */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setExperience('landing')}
            title="Return to Experience Selector"
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                isFood
                  ? 'bg-[#c95d2c] text-white shadow-md shadow-[#c95d2c]/40'
                  : 'bg-[#3e6f4f] text-white shadow-md shadow-[#3e6f4f]/40'
              }`}
            >
              {isFood ? <Utensils className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-lg font-bold tracking-tight">
                  CRAVING
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase tracking-widest ${
                    isFood
                      ? 'bg-[#c95d2c]/20 text-[#e99a77] border border-[#c95d2c]/30'
                      : 'bg-[#3e6f4f]/30 text-[#a3d9b4] border border-[#3e6f4f]/40'
                  }`}
                >
                  {isFood ? 'BISTRO' : 'MATCHA BAR'}
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase opacity-60 font-sans block">
                {isFood ? 'Artisanal Dining' : 'Specialty Drinks'}
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-3.5 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200 rounded-full ${
                  isActive
                    ? isFood
                      ? 'text-[#f5efe6] font-semibold'
                      : 'text-[#f3f7f4] font-semibold'
                    : 'text-stone-300/80 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className={`absolute inset-0 rounded-full ${
                      isFood ? 'bg-[#c95d2c]/25 border border-[#c95d2c]/40' : 'bg-[#3e6f4f]/30 border border-[#3e6f4f]/40'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Switch Experience, Search & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Switch Experience Pill Toggle */}
          <button
            onClick={toggleExperience}
            id="btn-switch-experience"
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 border ${
              isFood
                ? 'bg-[#291e19]/80 border-[#4a3429] text-[#e8a381] hover:bg-[#382821] hover:border-[#c95d2c]'
                : 'bg-[#18261e]/80 border-[#2d4737] text-[#a9d7b9] hover:bg-[#203328] hover:border-[#4d8662]'
            }`}
            title="Switch Experience between Food and Drinks"
          >
            <ArrowLeftRight className="w-3 h-3" />
            <span>Switch to {isFood ? 'DRINKS' : 'FOOD'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            id="btn-nav-search"
            aria-label="Search"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors"
          >
            <Search className="w-4 h-4 opacity-80" />
          </button>

          {/* Cart Trigger with Animated Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            id="btn-nav-cart"
            aria-label="View Cart"
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
              isFood
                ? 'bg-[#c95d2c] hover:bg-[#b24f22] text-white shadow-md shadow-[#c95d2c]/30'
                : 'bg-[#3e6f4f] hover:bg-[#325a40] text-white shadow-md shadow-[#3e6f4f]/30'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-sans text-xs uppercase tracking-wider font-semibold">
              Cart
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={cartCount}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="w-5 h-5 rounded-full bg-black/40 text-[11px] font-mono font-bold flex items-center justify-center text-white"
              >
                {cartCount}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden overflow-hidden border-b ${
              isFood ? 'bg-[#1a1310] border-[#362720]' : 'bg-[#101b14] border-[#25392d]'
            }`}
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-200 hover:bg-white/5"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    toggleExperience();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border ${
                    isFood
                      ? 'border-[#c95d2c] text-[#e8a381] bg-[#c95d2c]/10'
                      : 'border-[#3e6f4f] text-[#a3d9b4] bg-[#3e6f4f]/10'
                  }`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  Switch to {isFood ? 'Drinks Experience' : 'Food Experience'}
                </button>
                <button
                  onClick={() => {
                    setExperience('landing');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs text-white/50 hover:text-white flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Back to Experience Selector
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
