import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { IProduct } from "@Shared/types"; // Предполагается, что типы хранятся в Shared/types
import { fetchProducts } from '../api/productsApi'; // Предполагается, что API запросы вынесены в отдельный файл
import Loader from '../components/Loader';

const ProductsListPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Ошибка при загрузке товаров", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Список товаров ({products.length})</h1>
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Товары не найдены</p>
        )}
      </div>
    </div>
  );
};

export default ProductsListPage;
