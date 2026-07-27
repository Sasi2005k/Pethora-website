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

const Youtube = (props) => (
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
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
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
          href="https://www.youtube.com/@pethorawomenswearjewellery" 
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
          <Youtube size={20} className="text-gold" />
          <span style={{ fontWeight: '500' }}>YouTube Channel</span>
        </a>

        <a 
          href="https://www.google.com/maps/place/PETHORA+WOMEN'S+WEAR+%26+JEWELLERY/@10.7521938,79.1226907,17z" 
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
    </div>
  );
}
