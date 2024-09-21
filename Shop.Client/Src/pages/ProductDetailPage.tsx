import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '@Shared/types'; // Типы из Shared/types
import { fetchProductById } from '../api/productsApi'; // Запросы к API
import Loader from '../components/Loader';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получение параметра ID из URL
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Ошибка при загрузке товара", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <p>Товар не найден</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.thumbnail?.url || '/placeholder.png'} alt={product.title} />
      <p>Описание: {product.description}</p>
      <p>Цена: {product.price} ₽</p>

      {product.images && product.images.length > 1 && (
        <div>
          <h3>Другие изображения</h3>
          <div className="product-images">
            {product.images.slice(1).map((image) => (
              <img key={image.id} src={image.url} alt={product.title} />
            ))}
          </div>
        </div>
      )}

      <h3>Комментарии</h3>
      {product.comments?.length ? (
        <ul>
          {product.comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.name}</strong> ({comment.email}): {comment.body}
            </li>
          ))}
        </ul>
      ) : (
        <p>Комментариев пока нет.</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
