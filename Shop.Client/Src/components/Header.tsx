import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/products-list">Список товаров</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
