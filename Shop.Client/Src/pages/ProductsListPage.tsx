import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { IProduct } from "@Shared/types"; 
import { fetchProducts } from '../api/productsApi'; 
import Loader from '../components/Loader';


const ProductsListPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [nameFilter, setNameFilter] = useState<string>('');
  const [priceFromFilter, setPriceFromFilter] = useState<number | ''>('');
  const [priceToFilter, setPriceToFilter] = useState<number | ''>('');


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

  const filterProducts = () => {
    return products.filter(product => {
      const matchesName = product.title.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesPriceFrom = priceFromFilter === '' || product.price >= priceFromFilter;
      const matchesPriceTo = priceToFilter === '' || product.price <= priceToFilter;

      return matchesName && matchesPriceFrom && matchesPriceTo;
    });
  };

  const resetFilters = () => {
    setNameFilter('');
    setPriceFromFilter('');
    setPriceToFilter('');
  };

  if (loading) {
    return <Loader />;
  }

  const filteredProducts = filterProducts();

  return (
    <div>
      <h1>Список товаров ({products.length})</h1>

       <div className="filters">
        <input
          type="text"
          placeholder="Поиск по названию"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Цена от"
          value={priceFromFilter}
          onChange={(e) => setPriceFromFilter(e.target.value ? parseFloat(e.target.value) : '')}
        />
        <input
          type="number"
          placeholder="Цена до"
          value={priceToFilter}
          onChange={(e) => setPriceToFilter(e.target.value ? parseFloat(e.target.value) : '')}
        />
        <button onClick={resetFilters}>Сбросить фильтры</button>
      </div>
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Товары не найдены</p>
        )}
      </div>
    </div>
  );
};

export default ProductsListPage;
