import React, { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  return (
    <div className="product-card">
      <div className="image-gallery">
        <img
          src={product.images[currentImageIdx]}
          alt={product.title}
          className="product-image"
        />
        <div className="thumbnail-row">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.title} ${idx + 1}`}
              className={`thumbnail ${idx === currentImageIdx ? "active" : ""}`}
              onClick={() => setCurrentImageIdx(idx)}
            />
          ))}
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">₹{product.price}</p>
      </div>
      <div className="product-links">
        {product.whatsapp && (
          <a href={product.whatsapp} target="_blank" rel="noopener noreferrer" className="link-icon">
            WhatsApp
          </a>
        )}
        {product.instagram && (
          <a href={product.instagram} target="_blank" rel="noopener noreferrer" className="link-icon">
            Instagram
          </a>
        )}
      </div>
    </div>
  );
}
