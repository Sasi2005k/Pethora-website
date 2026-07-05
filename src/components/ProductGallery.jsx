import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductGallery() {
  return (
    <section className="product-gallery">
      <h2 className="gallery-title" style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--gold)' }}>
        Our Collection
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Cotton saree prices start from ₹430 - ₹999 &amp; Spay Silk sarees start from ₹899 - ₹1699 for special offers.
      </p>
      <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', padding: '0 2rem' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
