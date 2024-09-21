import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '@Shared/types';

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
        <h3>{product.title}</h3>
      </Link>
      <p>Цена: {product.price} ₽</p>
      <p>Количество комментариев: {product.comments?.length || 0}</p>
    </div>
  );
};

export default ProductCard;
