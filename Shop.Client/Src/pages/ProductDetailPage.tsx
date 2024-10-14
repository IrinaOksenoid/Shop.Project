import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct, IRelatedProduct } from '@Shared/types'; 
import { fetchProductById, fetchRelatedProducts } from '../api/productsApi'; 
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IRelatedProduct[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRelated, setLoadingRelated] = useState<boolean>(true); 

  useEffect(() => {
    const getProduct = async () => {
      if (id) {try {
        setLoading(true);
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Ошибка при загрузке товара", error);
      } finally {
        setLoading(false);
      }
    }
    };

    const getRelatedProducts = async () => {
      if (id) {
        try {
          setLoadingRelated(true);
          const fetchedRelatedProducts = await fetchRelatedProducts(id); 
          setRelatedProducts(fetchedRelatedProducts);
        } catch (error) {
          console.error("Ошибка при загрузке похожих товаров", error);
        } finally {
          setLoadingRelated(false);
        }
      }
    };
    getProduct();
    getRelatedProducts();
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
        <h3>Похожие товары</h3>
      {loadingRelated ? (
        <Loader />
      ) : relatedProducts.length > 0 ? (
        <ul>
          {relatedProducts.map((relatedProduct) => (
            <li key={relatedProduct.id}>
              <Link to={`/products/${relatedProduct.id}`}>
                {relatedProduct.title} - {relatedProduct.price} ₽
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Похожие товары не найдены</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
