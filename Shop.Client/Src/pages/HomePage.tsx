import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Добро пожаловать в Shop.Client</h1>
      <p>Здесь вы найдете множество товаров на любой вкус.</p>
      <Link to="/products-list">
        <button>Перейти к списку товаров</button>
      </Link>
    </div>
  );
};

export default HomePage;
