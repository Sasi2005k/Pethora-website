import { useState, useEffect, useCallback } from 'react';

const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Header({ activeSection, menuItems, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Throttled scroll handler for performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // iOS-safe body scroll lock without resetting scroll position
  useEffect(() => {
    if (!isOpen) return undefined;

    const preventScroll = (e) => {
      // Allow scrolling inside the mobile drawer, but block scrolling outside
      if (!e.target.closest('.mobile-drawer')) {
        e.preventDefault();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isOpen]);

  const handleNavClick = useCallback((e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    onNavigate(targetId);
  }, [onNavigate]);

  return (
    <>
      <header className={`luxury-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
          <img className="brand-logo brand-logo--nav" src="/pethora-logo.png" alt="Pethora logo" />
          <span>PETHORA</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Main navigation">
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  className={`nav-link ${activeSection === item.target ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.target)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons (desktop) */}
        <div className="header-social">
          <a href="https://wa.me/918903557852" target="_blank" rel="noopener noreferrer"
            className="header-social-icon" aria-label="WhatsApp" title="WhatsApp">
            <WhatsAppIcon size={20} />
          </a>
          <a href="https://www.instagram.com/pethora_womenswear?igsh=MTYxaXAwYWNxd21kaA=="
            target="_blank" rel="noopener noreferrer"
            className="header-social-icon" aria-label="Instagram" title="Instagram">
            <InstagramIcon size={20} />
          </a>
        </div>

        {/* Hamburger Button */}
        <button
          className={`nav-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(v => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-nav-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <nav
        className={`mobile-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <img className="brand-logo brand-logo--nav" src="/pethora-logo.png" alt="Pethora" />
          <span className="drawer-brand">PETHORA</span>
          <button className="drawer-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
            &times;
          </button>
        </div>

        {/* Nav Links */}
        <ul className="drawer-links">
          {menuItems.map((item, idx) => (
            <li key={item.target} style={{ '--i': idx }}>
              <a
                href={`#${item.target}`}
                className={`drawer-link ${activeSection === item.target ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.target)}
              >
                {item.label}
                {activeSection === item.target && <span className="drawer-active-dot" />}
              </a>
            </li>
          ))}
        </ul>

        {/* Social links in drawer */}
        <div className="drawer-social">
          <a href="https://wa.me/918903557852" target="_blank" rel="noopener noreferrer"
            className="drawer-social-btn whatsapp">
            <WhatsAppIcon size={18} /> WhatsApp Us
          </a>
          <a href="https://www.instagram.com/pethora_womenswear?igsh=MTYxaXAwYWNxd21kaA=="
            target="_blank" rel="noopener noreferrer"
            className="drawer-social-btn instagram">
            <InstagramIcon size={18} /> Instagram
          </a>
        </div>
      </nav>
    </>
  );
}
