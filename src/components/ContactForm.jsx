import { useState } from 'react';
import { Send, PhoneCall, MapPin } from 'lucide-react';

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

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: 'Sarees',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct pre-filled message for the owner's WhatsApp
    const messageText = `Hello Pethora, I would like to book a styling consultation:
- Name: ${formState.name}
- Email: ${formState.email}
- Phone: ${formState.phone}
- Collection: ${formState.inquiry}
- Message: ${formState.message}`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/918903557852?text=${encodedMessage}`;

    setSubmitted(true);

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', phone: '', inquiry: 'Sarees', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h3 className="font-accent text-gold" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
            Thank You
          </h3>
          <p style={{ color: 'var(--beige)' }}>
            Your request has been woven into our timeline. A Pethora personal stylist will connect with you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Your Name</label>
            <input
              className="form-input"
              type="text"
              id="name"
              name="name"
              required
              value={formState.name}
              onChange={handleChange}
              placeholder="e.g. Priyadarshini Sen"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                placeholder="priya@example.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <input
                className="form-input"
                type="tel"
                id="phone"
                name="phone"
                required
                value={formState.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="inquiry">Collection of Interest</label>
            <select
              className="form-input"
              id="inquiry"
              name="inquiry"
              value={formState.inquiry}
              onChange={handleChange}
              style={{ background: '#170b24' }}
            >
              <option value="Sarees">Sarees</option>
              <option value="Chudithars">Nighty & Sleepwear</option>
              <option value="Kurtis">Kurthi & Leggings</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Custom">Bespoke Bridal Consultations</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">Your Message</label>
            <textarea
              className="form-input"
              id="message"
              name="message"
              required
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell us about the occasion, styles, or specific pieces you wish to explore..."
            />
          </div>

          <button type="submit" className="btn-gold pulse-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
            <Send size={16} />
            <span>Send Stylist Inquiry</span>
          </button>
        </form>
      )}

      {/* Integration Links Panel */}
      <div 
        style={{
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          paddingTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '1rem',
          textAlign: 'center'
        }}
      >
        <a 
          href="https://wa.me/918903557852" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-panel-light"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            color: 'var(--beige)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          <PhoneCall size={20} className="text-gold" />
          <span style={{ fontWeight: '500' }}>WhatsApp Chat</span>
        </a>

        <a 
          href="https://instagram.com/pethora_womenswear" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-panel-light"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            color: 'var(--beige)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          <Instagram size={20} className="text-gold" />
          <span style={{ fontWeight: '500' }}>Instagram Page</span>
        </a>

        <a 
          href="https://www.facebook.com/share/197Wz9mZHg/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-panel-light"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            color: 'var(--beige)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          <Facebook size={20} className="text-gold" />
          <span style={{ fontWeight: '500' }}>Facebook Page</span>
        </a>

        <a 
          href="https://maps.app.goo.gl/yWZSsxSb2ZpRt4Wd6?g_st=aw" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-panel-light"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            color: 'var(--beige)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          <MapPin size={20} className="text-gold" />
          <span style={{ fontWeight: '500' }}>Locate Boutique</span>
        </a>
      </div>

      {/* Styled Google Maps Iframe */}
      <div 
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          height: '180px',
          width: '100%',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
      >
        <iframe
          title="Pethora Boutique Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9731215162447!2d80.2526848757917!3d12.973562687342082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d640989f665%3A0xe54e66ffb38a4d46!2sPethora!5e0!3m2!1sen!2sin!4v1718256565000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
