import axios from 'axios';
import { IProduct } from '@Shared/types'; // Предполагаем, что у вас уже есть интерфейсы в Shared/types

// Базовый URL для API. Можно также использовать переменные окружения.
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Функция для получения списка всех товаров
export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axios.get<IProduct[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка товаров:', error);
    throw error;
  }
};

// Функция для получения товара по ID
export const fetchProductById = async (id: string): Promise<IProduct> => {
  try {
    const response = await axios.get<IProduct>(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении товара с ID ${id}:`, error);
    throw error;
  }
};

// Пример функции для добавления нового товара
export const createProduct = async (productData: IProduct): Promise<IProduct> => {
  try {
    const response = await axios.post<IProduct>(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    throw error;
  }
};

