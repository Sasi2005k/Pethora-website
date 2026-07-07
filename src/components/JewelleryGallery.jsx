import React from 'react';
import ProductCard from './ProductCard';
import { jewelleryProducts } from '../data/products';
import './ProductGallery.css';

export default function JewelleryGallery() {
  if (!jewelleryProducts || jewelleryProducts.length === 0) return null;
  return (
    <section className="product-gallery">
      <h2 className="gallery-title">Jewellery Collection</h2>
      <div className="gallery-grid">
        {jewelleryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
