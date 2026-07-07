import React, { useState, useEffect } from 'react';
import './CustomerReviews.css';

const StarIcon = ({ filled, onClick, size = 22 }) => (
  <svg
    onClick={onClick}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? '#D4AF37' : 'none'}
    stroke={filled ? '#D4AF37' : '#888'}
    strokeWidth="1.5"
    style={{ cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s' }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const STORAGE_KEY = 'pethora_reviews';

const defaultReviews = [
  {
    id: 1,
    name: 'Priya S.',
    rating: 5,
    text: 'Absolutely loved the saree collection! The quality is outstanding and delivery was super fast. Will definitely order again! 🌸',
    date: '2 days ago',
    avatar: 'P'
  },
  {
    id: 2,
    name: 'Meena R.',
    rating: 5,
    text: 'The Kanjivaram saree I ordered was exactly as shown. The colors are vibrant and the fabric feels very premium. Highly recommended!',
    date: '1 week ago',
    avatar: 'M'
  },
  {
    id: 3,
    name: 'Lakshmi V.',
    rating: 4,
    text: 'Beautiful kurthi collection. The kalamkari prints are gorgeous. Loved the packaging too — felt like a gift! ✨',
    date: '2 weeks ago',
    avatar: 'L'
  },
  {
    id: 4,
    name: 'Divya K.',
    rating: 5,
    text: 'The jewellery pieces are stunning! Got the Jhumka Kammal and it looks so elegant. Great value for money.',
    date: '3 weeks ago',
    avatar: 'D'
  }
];

export default function CustomerReviews() {
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultReviews;
    } catch {
      return defaultReviews;
    }
  });

  const [form, setForm] = useState({ name: '', text: '', rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Please enter your name.'); return; }
    if (form.rating === 0) { setError('Please select a star rating.'); return; }
    if (!form.text.trim()) { setError('Please write your review.'); return; }

    const newReview = {
      id: Date.now(),
      name: form.name.trim(),
      rating: form.rating,
      text: form.text.trim(),
      date: 'Just now',
      avatar: form.name.trim()[0].toUpperCase()
    };

    setReviews(prev => [newReview, ...prev]);
    setForm({ name: '', text: '', rating: 0 });
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <div className="reviews-badge">⭐ Customer Reviews</div>
        <h2 className="reviews-title">What Our Customers Say</h2>
        <div className="reviews-avg">
          <span className="avg-number">{avgRating}</span>
          <div className="avg-stars">
            {[1,2,3,4,5].map(i => (
              <StarIcon key={i} filled={i <= Math.round(avgRating)} size={20} />
            ))}
          </div>
          <span className="avg-count">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Review Cards */}
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-top">
              <div className="reviewer-avatar">{review.avatar}</div>
              <div className="reviewer-info">
                <span className="reviewer-name">{review.name}</span>
                <span className="reviewer-date">{review.date}</span>
              </div>
              <div className="review-stars">
                {[1,2,3,4,5].map(i => (
                  <StarIcon key={i} filled={i <= review.rating} size={16} />
                ))}
              </div>
            </div>
            <p className="review-text">"{review.text}"</p>
          </div>
        ))}
      </div>

      {/* Submit Review Form */}
      <div className="review-form-wrap">
        <h3 className="form-title">💬 Share Your Experience</h3>
        {submitted && (
          <div className="success-msg">✅ Thank you for your review! We appreciate your feedback.</div>
        )}
        {error && <div className="error-msg">⚠️ {error}</div>}
        <form className="review-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="review-input"
            placeholder="Your Name"
            value={form.name}
            onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setError(''); }}
          />
          <div className="star-picker">
            <span className="star-label">Your Rating:</span>
            {[1,2,3,4,5].map(i => (
              <StarIcon
                key={i}
                filled={i <= (hoverRating || form.rating)}
                onClick={() => setForm(f => ({ ...f, rating: i }))}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                size={28}
              />
            ))}
          </div>
          <textarea
            className="review-textarea"
            placeholder="Tell us about your experience with Pethora Boutique..."
            rows={4}
            value={form.text}
            onChange={e => { setForm(f => ({ ...f, text: e.target.value })); setError(''); }}
          />
          <button type="submit" className="review-submit-btn">
            Submit Review ✨
          </button>
        </form>
      </div>
    </section>
  );
}
