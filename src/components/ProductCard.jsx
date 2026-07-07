import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ProductCard.css';

const InstagramIcon = ({ size = 18 }) => (
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

const WhatsAppIcon = ({ size = 18 }) => (
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

export default function ProductCard({ product }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const changeImage = (newIdx) => {
    if (newIdx !== currentImageIdx && newIdx < product.images.length) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIdx(newIdx);
        setIsFading(false);
      }, 150); // triggers half-way through the 300ms transition
    }
  };

  const handleColorClick = (imageIdx) => {
    changeImage(imageIdx);
  };

  const getWhatsAppUrl = () => {
    if (!product.whatsapp) return '';
    const message = encodeURIComponent(`Hi! I'm interested in the ${product.title} (₹${product.price}). Could you provide more details?`);
    const separator = product.whatsapp.includes('?') ? '&' : '?';
    return `${product.whatsapp}${separator}text=${message}`;
  };

  return (
    <div className="product-card">
      <div className="image-gallery">
        <img
          src={product.images[currentImageIdx]}
          alt={product.title}
          className={`product-image ${isFading ? 'fade-out' : 'fade-in'}`}
          onClick={() => setIsZoomed(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/spay1.jpg';
          }}
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">₹{product.price}</p>
        
        {/* Color variants */}
        {product.colors && product.colors.length > 0 && (
          <div className="color-variants-section">
            <span className="color-label">Colors:</span>
            <div className="color-swatches">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  className={`color-swatch ${color.imageIdx === currentImageIdx ? "selected" : ""}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  onClick={() => handleColorClick(color.imageIdx)}
                  aria-label={`Select ${color.name} variant`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="product-links">
        {product.whatsapp && (
          <a 
            href={getWhatsAppUrl()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-btn whatsapp-btn"
            title="Inquire on WhatsApp"
          >
            <WhatsAppIcon size={18} />
            <span>WhatsApp</span>
          </a>
        )}
        {product.instagram && (
          <a 
            href={product.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-btn instagram-btn"
            title="View on Instagram"
          >
            <InstagramIcon size={18} />
            <span>Instagram</span>
          </a>
        )}
      </div>

      {/* Image Zoom Modal rendered via Portal to escape stacking context */}
      {isZoomed && createPortal(
        <div className="image-zoom-modal" onClick={() => setIsZoomed(false)}>
          <button 
            className="close-zoom-btn" 
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            &times;
          </button>
          <img 
            src={product.images[currentImageIdx]} 
            alt={product.title} 
            className="zoomed-image" 
            onClick={(e) => e.stopPropagation()} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/spay1.jpg';
            }}
          />
        </div>,
        document.body
      )}
    </div>
  );
}
