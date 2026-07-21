import { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ProductGallery from './components/ProductGallery';
import KurthiGallery from './components/KurthiGallery';
import NightyGallery from './components/NightyGallery';
import JewelleryGallery from './components/JewelleryGallery';
import CustomerReviews from './components/CustomerReviews';
import {
  ArrowDown,
  ArrowRight,
  Award,
  Compass,
  Heart,
  MapPin,
  PhoneCall,
  Sparkles,
  Stars,
  WandSparkles
} from 'lucide-react';
import './App.css';

const Instagram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const menuItems = [
  { label: 'Home', target: 'home' },
  { label: 'Sarees', target: 'sarees' },
  { label: 'Nighty & Sleepwear', target: 'chudithars' },
  { label: 'Kurthi & Leggings', target: 'kurtis' },
  { label: 'Jewellery', target: 'jewellery' },
  { label: 'About', target: 'about' },
  { label: 'Contact', target: 'contact' }
];

const categoryPages = {
  sarees: {
    eyebrow: 'Signature Drape',
    title: 'Royal Silks',
    image: '/saree.png',
    summary:
      'Pure zari, heavy Mulberry silk, and temple-inspired motifs crafted for heirloom bridal moments.',
    intro:
      'Our saree edit is built around occasion, movement, and memory. Each piece is selected for its fall, border balance, zari quality, and how beautifully it photographs through ceremony light.',
    highlights: ['Bridal silks', 'Soft tissue and organza drapes', 'Handloom festive edits'],
    sections: [
      {
        title: 'Bridal Silks',
        text: 'Weighty silks with grand borders, contrast pallus, and traditional motifs for ceremonies that need presence.'
      },
      {
        title: 'Festive Light Drapes',
        text: 'Lighter weaves for receptions, temple visits, and intimate celebrations where comfort matters.'
      },
      {
        title: 'Styling Notes',
        text: 'Pair with antique chokers, soft jasmine hair styling, and blouse cuts tailored to your event schedule.'
      }
    ]
  },
  chudithars: {
    eyebrow: 'Comfort & Style',
    title: 'Nighty & Women Sleepwear',
    image: '/nighty-hero.jpg',
    summary:
      'Premium nightwear and sleepwear crafted for women — soft fabrics, elegant prints, and restful comfort.',
    intro:
      'Our sleepwear collection combines comfort with style. Choose from breathable cotton nighties, printed sets, and soft-touch loungewear designed for restful nights and relaxed mornings.',
    highlights: ['Soft cotton nighties', 'Printed sleepwear sets', 'Breathable lounge wear'],
    sections: [
      {
        title: 'Tailored Fit',
        text: 'Measurements are balanced around shoulder fall, sleeve movement, and dupatta styling.'
      },
      {
        title: 'Hand Details',
        text: 'Mirror work, thread highlights, and border placements are chosen to frame the wearer cleanly.'
      },
      {
        title: 'Occasion Sets',
        text: 'From haldi-friendly colors to reception-ready jewel tones, each set can be styled by event.'
      }
    ]
  },
  kurtis: {
    eyebrow: 'Everyday Elegance',
    title: 'Kurthi & Leggings Collection',
    image: '/kurti.png',
    summary:
      'Stylish kurthis paired with matching leggings — perfect for everyday wear, casual outings, and festive occasions.',
    intro:
      'Our Kurthi & Leggings collection offers vibrant prints, ethnic embroidery, and comfortable fits that keep you looking polished all day long.',
    highlights: ['Matching leggings sets', 'Cotton & linen blends', 'Ethnic embroidery prints'],
    sections: [
      {
        title: 'Modern Shapes',
        text: 'Straight cuts, A-line tunics, and layered hems that work across casual and festive settings.'
      },
      {
        title: 'Breathable Fabrics',
        text: 'Selected for comfort across long days while preserving polish in photos and in person.'
      },
      {
        title: 'Subtle Craft',
        text: 'Minimal embroidery and woven borders add richness without making daily wear feel heavy.'
      }
    ]
  },
  jewellery: {
    eyebrow: 'Royal Adornments',
    title: 'Kundan & Antique Gold Jewels',
    image: '/jewellery.png',
    summary:
      'Heirloom-inspired chokers, jhumkas, bangles, and layered bridal sets with antique gold character.',
    intro:
      'The jewellery edit is curated to complete the outfit without overpowering it. Each piece is chosen for face framing, neckline compatibility, and the warmth of antique finishes.',
    highlights: ['Bridal layering sets', 'Statement jhumkas', 'Antique-finish chokers'],
    sections: [
      {
        title: 'Neckline Pairing',
        text: 'Chokers, long harams, and collar pieces are matched to blouse depth and saree border weight.'
      },
      {
        title: 'Generational Finish',
        text: 'Antique gold tones, ruby accents, and kundan settings create a passed-down heirloom mood.'
      },
      {
        title: 'Complete Looks',
        text: 'We style earrings, bangles, waist belts, and hair accessories as one balanced story.'
      }
    ]
  }
};

const pageIds = menuItems.map((item) => item.target);

function getInitialPage() {
  const hash = window.location.hash.replace('#', '');
  return pageIds.includes(hash) ? hash : 'home';
}

function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(getInitialPage);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getInitialPage());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (loading) return undefined;

    const revealItems = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activePage, loading]);

  const handleNavigate = (targetPage) => {
    setActivePage(targetPage);
    window.history.pushState(null, '', `#${targetPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (activePage === 'home') return <HomePage onNavigate={handleNavigate} />;
    if (activePage === 'about') return <AboutPage onNavigate={handleNavigate} />;
    if (activePage === 'contact') return <ContactPage />;
    if (activePage === 'sarees') return (
      <>
        <DetailPage page={categoryPages['sarees']} onNavigate={handleNavigate} />
        <ProductGallery />
        <CustomerReviews />
      </>
    );
    if (activePage === 'chudithars') return (
      <>
        <DetailPage page={categoryPages['chudithars']} onNavigate={handleNavigate} />
        <NightyGallery />
        <CustomerReviews />
      </>
    );
    if (activePage === 'kurtis') return (
      <>
        <DetailPage page={categoryPages['kurtis']} onNavigate={handleNavigate} />
        <KurthiGallery />
        <CustomerReviews />
      </>
    );
    if (activePage === 'jewellery') return (
      <>
        <DetailPage page={categoryPages['jewellery']} onNavigate={handleNavigate} />
        <JewelleryGallery />
        <CustomerReviews />
      </>
    );
    return <DetailPage page={categoryPages[activePage]} onNavigate={handleNavigate} />;
  };

  return (
    <div className="app-container">
      <div className={`splash-loader ${!loading ? 'loaded' : ''}`}>
        <img className="brand-logo brand-logo--loader" src="/pethora-logo.png" alt="Pethora logo" />
        <div className="loader-line-container">
          <div className="loader-line" />
        </div>
        <p className="loader-subtitle">Curating Timeless Heritage</p>
      </div>

      {!loading && (
        <>
          <Header activeSection={activePage} menuItems={menuItems} onNavigate={handleNavigate} />
          <div className="luxury-slogan-bar">
            <span className="luxury-slogan-text">Every thread Whispers Elegance</span>
          </div>
          <main className="content-wrapper page-content">{renderPage()}</main>
          <SiteFooter />
        </>
      )}
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <section id="home" className="home-hero">
        <div className="home-hero__content reveal-on-scroll">
          <img className="brand-logo brand-logo--hero" src="/pethora-logo.png" alt="Pethora logo" />
          <div className="eyebrow-pill">Exquisite Indian Heritage</div>
          <h1 className="font-accent" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', lineHeight: 1.1 }}>
            PETHORA <span style={{ display: 'block', fontSize: 'clamp(1rem, 3.5vw, 1.8rem)', letterSpacing: '0.15em', marginTop: '0.5rem' }}>Women's Wear & Jewellery</span>
          </h1>
          <p>
            An premium destination for royal silks, designer kurtis, sleepwear, and antique jewellery.
            Journey through our heritage story below, then explore each collection.
          </p>
          <div className="hero-actions">
            <button className="btn-gold" onClick={() => onNavigate('sarees')}>
              Begin Journey
            </button>
            <button className="btn-outline" onClick={() => onNavigate('contact')}>
              Book Styling
            </button>
          </div>
          <button className="scroll-cue" onClick={() => document.getElementById('heritage-story')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Explore Our Story</span>
            <ArrowDown size={18} className="animate-float" />
          </button>
        </div>
      </section>

      {/* Cinematic Storytelling Section */}
      <section id="heritage-story" className="storytelling-narrative">
        <div className="storytelling-bg-glow" />
        
        <div className="section-heading reveal-on-scroll">
          <Sparkles size={18} className="text-gold" />
          <h2>The Pethora Chronicles</h2>
          <p>A heritage woven across threads, time, and luxury adornments.</p>
        </div>

        <div className="narrative-container">
          <div className="narrative-step reveal-on-scroll">
            <div className="narrative-card">
              <span className="narrative-tag">Chapter I</span>
              <h3>The Sacred Drape</h3>
              <p>Every premium saree we curate starts with selected mulberry silk and rich zari threads, woven to reflect the graceful posture and heritage of the modern goddess.</p>
              <button className="narrative-btn" onClick={() => onNavigate('sarees')}>
                Explore Sarees <ArrowRight size={14} />
              </button>
            </div>
            <div className="narrative-visual">
              <div className="visual-circle" style={{ backgroundImage: 'url("/saree.png")' }} />
            </div>
          </div>

          <div className="narrative-step reveal-on-scroll alternate">
            <div className="narrative-card">
              <span className="narrative-tag">Chapter II</span>
              <h3>Grace in Movement</h3>
              <p>Our Kurthi, Leggings, and Sleepwear lines merge daily comfort with aesthetic layouts. Designed to transition smoothly from busy days into serene, restful nights.</p>
              <button className="narrative-btn" onClick={() => onNavigate('kurtis')}>
                Explore Kurtis <ArrowRight size={14} />
              </button>
            </div>
            <div className="narrative-visual">
              <div className="visual-circle" style={{ backgroundImage: 'url("/kurti.png")' }} />
            </div>
          </div>

          <div className="narrative-step reveal-on-scroll">
            <div className="narrative-card">
              <span className="narrative-tag">Chapter III</span>
              <h3>Heirlooms of Gold</h3>
              <p>Our Kundan and Antique Jewellery completes the luxury silhouette, curated carefully to frame your facial aesthetics with the rich finish of passed-down treasures.</p>
              <button className="narrative-btn" onClick={() => onNavigate('jewellery')}>
                Explore Jewellery <ArrowRight size={14} />
              </button>
            </div>
            <div className="narrative-visual">
              <div className="visual-circle" style={{ backgroundImage: 'url("/jewellery.png")' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="overview-band">
        <div className="section-heading reveal-on-scroll">
          <Sparkles size={18} className="text-gold" />
          <h2>Explore The Collections</h2>
          <p>Step directly into each collection page for prices, details, and customization options.</p>
        </div>

        <div className="overview-stack">
          {Object.entries(categoryPages).map(([id, page]) => (
            <article id={id} className="overview-row reveal-on-scroll" key={id}>
              <div className="overview-copy">
                <span className="font-accent text-gold">{page.eyebrow}</span>
                <h3>{page.title}</h3>
                <p>{page.summary}</p>
                <button className="text-link-button" onClick={() => onNavigate(id)}>
                  Open full page <ArrowRight size={16} />
                </button>
              </div>
              <button className="overview-image" onClick={() => onNavigate(id)} aria-label={`Open ${page.title}`}>
                <img src={page.image} alt={page.title} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function DetailPage({ page, onNavigate }) {
  return (
    <article className="detail-page">
      <section className="detail-hero">
        <div className="detail-copy reveal-on-scroll">
          <span className="font-accent text-gold">{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="hero-actions">
            <button className="btn-gold" onClick={() => onNavigate('contact')}>
              Book Consultation
            </button>
            <button className="btn-outline" onClick={() => onNavigate('home')}>
              Back Home
            </button>
          </div>
        </div>
        <div className="detail-image-wrap reveal-on-scroll">
          <img src={page.image} alt={page.title} />
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-highlights">
          {page.highlights.map((highlight) => (
            <div className="highlight-card reveal-on-scroll" key={highlight}>
              <Stars size={20} className="text-gold" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

function AboutPage({ onNavigate }) {
  return (
    <article className="detail-page">
      <section className="detail-hero about-hero">
        <div className="detail-copy reveal-on-scroll">
          <span className="font-accent text-gold">Our Philosophy</span>
          <h1>The Pethora Vision</h1>
          <p>
            Pethora treats clothing and jewellery as living heritage. We curate pieces that
            honor weaving, hand embroidery, antique finishes, and the emotional weight of
            celebration dressing.
          </p>
          <div className="founder-signature">
            <span className="font-accent text-gold">Founder</span>
            <strong>K. Selvarani</strong>
            <p>Guiding Pethora from Jai Raj Complex, Madhakottai Road, Thanjavur with a love for graceful women's wear and jewellery.</p>
          </div>
          <button className="btn-gold" onClick={() => onNavigate('contact')}>
            Meet Our Stylist
          </button>
        </div>
        <div className="values-panel reveal-on-scroll">
          <Value icon={<Award size={24} />} title="Generational Loom" text="Working with legacy handloom traditions and regional craft language." />
          <Value icon={<Compass size={24} />} title="Surreal Styling" text="Blending mythology, couture references, and modern wearability." />
          <Value icon={<Heart size={24} />} title="Pure Materials" text="Prioritizing thoughtful fabrics, warm finishes, and long-lived pieces." />
        </div>
      </section>
    </article>
  );
}

function Value({ icon, title, text }) {
  return (
    <div className="value-item">
      <span className="text-gold">{icon}</span>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <section className="contact-page">
      <div className="section-heading reveal-on-scroll">
        <WandSparkles size={20} className="text-gold" />
        <h1>Book Your Stylist</h1>
        <p>Connect with K. Selvarani, Founder of Pethora, for styling and boutique visits.</p>
      </div>
      <div className="founder-contact-grid reveal-on-scroll">
        <a href="tel:+918903557852">
          <PhoneCall size={20} className="text-gold" />
          <span>+91 89035 57852</span>
        </a>

        <a href="https://instagram.com/pethora_womenswear" target="_blank" rel="noopener noreferrer">
          <Instagram size={20} className="text-gold" />
          <span>Instagram</span>
        </a>
        <a href="https://www.facebook.com/share/197Wz9mZHg/" target="_blank" rel="noopener noreferrer">
          <Facebook size={20} className="text-gold" />
          <span>Facebook</span>
        </a>
      </div>

      {/* Shop Location Map Section */}
      <div className="shop-location-section reveal-on-scroll">
        <div className="shop-location-header">
          <MapPin size={22} className="text-gold" />
          <h2>Find Our Boutique</h2>
        </div>
        <div className="shop-location-card">
          <div className="shop-address-block">
            <div className="shop-address-info">
              <span className="shop-name-label">PETHORA BOUTIQUE</span>
              <address>
                Shop No. 4, Jai Raj Complex,<br />
                Plot No. 3, Madhakottai Rd,<br />
                7th Bank Staff Colony,<br />
                Annai Sathya Nagar, Nanjikottai,<br />
                Tamil Nadu &#8211; 613005
              </address>
              <div className="shop-hours">
                <span>&#128336;</span>
                <span>Mon &#8211; Sat: 9:00 AM &#8211; 8:00 PM</span>
              </div>
              <div className="shop-phone">
                <span>&#128222;</span>
                <span>+91 89035 57852</span>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/place/PETHORA+WOMEN'S+WEAR+%26+JEWELLERY/@10.7521938,79.1226907,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-open-maps"
            >
              <MapPin size={16} />
              Open in Google Maps
            </a>
          </div>
          <div className="shop-map-embed">
            <iframe
              title="Pethora Boutique - Shop No 4, Jai Raj Complex, Nanjikottai"
              src="https://maps.google.com/maps?q=PETHORA+WOMEN%27S+WEAR+%26+JEWELLERY,+Nanjikottai,+Tamil+Nadu+613005&ll=10.7521938,79.1226907&z=17&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="contact-shell reveal-on-scroll">
        <ContactForm />
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <img className="brand-logo brand-logo--footer" src="/pethora-logo.png" alt="Pethora logo" />
      <h3 className="font-accent text-gold">PETHORA</h3>
      <p>
        Curating fine sarees, designer ethnic silhouettes, and luxury antique heritage jewellery
        for the modern goddess.
      </p>
      <span>&copy; {new Date().getFullYear()} Pethora Women's Wear & Jewellery. All Rights Reserved.</span>
    </footer>
  );
}

export default App;
