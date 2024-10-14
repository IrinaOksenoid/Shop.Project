import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductSummary } from '../api/productsApi';

const HomePage: React.FC = () => {
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    const getProductSummary = async () => {
      try {
        const { totalProducts, totalPrice } = await fetchProductSummary();
        setTotalProducts(totalProducts);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error('Ошибка при получении данных о товарах:', error);
      }
    };

    getProductSummary();
  }, []);

  return (
    <div className='Homepage'>
      <h1>Добро пожаловать в Shop.Client</h1>
      {totalProducts !== null && totalPrice !== null ? (
        <p>В базе данных находится {totalProducts} товаров общей стоимостью {totalPrice} ₽.</p>
      ) : (
        <p>Загрузка данных...</p>
      )}
      <p>
      <Link to="/products-list">
        <button>Перейти к списку товаров</button>
      </Link>
      </p>
       {/* Кнопка для перехода в систему администрирования */}
       <p>
        <a href="http://localhost:3000/admin" target="_blank" rel="noopener noreferrer">
          <button className='admin-button'>Перейти в систему администрирования</button>
        </a>
      </p>
    </div>
  );
};

export default HomePage;
