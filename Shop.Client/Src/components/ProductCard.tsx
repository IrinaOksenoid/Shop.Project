import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '@Shared/types';
import './ProductCard.css';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail?.url || '/placeholder.png'}
          alt={product.title}
        />
        <h2>{product.title}</h2>
      </Link>
      <div className="product-info">
        <p className="price">Цена: {product.price} ₽</p>
        <p>Количество комментариев: {product.comments?.length || 0}</p>
      </div>
    </div>
  );
};

export default ProductCard;
