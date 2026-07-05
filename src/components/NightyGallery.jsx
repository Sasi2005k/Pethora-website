import React from 'react';
import ProductCard from './ProductCard';
import { nightyProducts } from '../data/products';
import './ProductGallery.css';

export default function NightyGallery() {
  if (!nightyProducts || nightyProducts.length === 0) return null;
  return (
    <section className="product-gallery">
      <h2 className="gallery-title">Nighty &amp; Women Sleepwear</h2>
      <div className="gallery-grid">
        {nightyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
