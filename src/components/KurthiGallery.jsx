import React from 'react';
import ProductCard from './ProductCard';
import { kurthiProducts } from '../data/products';
import './ProductGallery.css';

export default function KurthiGallery() {
  if (!kurthiProducts || kurthiProducts.length === 0) return null;
  return (
    <section className="product-gallery">
      <h2 className="gallery-title">Kurthi &amp; Leggings Collection</h2>
      <div className="gallery-grid">
        {kurthiProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
