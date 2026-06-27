import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const InstagramIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Header({ activeSection, menuItems, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    onNavigate(targetId);
  };

  return (
    <header className={`luxury-header ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
        <img className="brand-logo brand-logo--nav" src="/pethora-logo.png" alt="Pethora logo" />
        <span>PETHORA</span>
      </a>

      {/* Desktop Navigation */}
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
      {/* Social Icons */}
      <div className="social-icons" style={{ display: 'flex', gap: '1.2rem', marginLeft: 'auto', alignItems: 'center' }}>
        <a 
          href="https://wa.me/918903557852" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="link-icon"
          aria-label="WhatsApp"
          style={{ color: 'var(--beige)', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#25D366'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--beige)'}
        >
          <WhatsAppIcon size={22} />
        </a>
        <a 
          href="https://www.instagram.com/pethora_womenswear?igsh=MTYxaXAwYWNxd21kaA==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="link-icon"
          aria-label="Instagram"
          style={{ color: 'var(--beige)', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#E1306C'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--beige)'}
        >
          <InstagramIcon size={22} />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Overlay Navigation */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#0b0710',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
          {menuItems.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '1.5rem',
                color: activeSection === item.target ? 'var(--gold)' : 'var(--beige)',
                textDecoration: 'none',
                letterSpacing: '0.15rem'
              }}
              onClick={(e) => handleNavClick(e, item.target)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
