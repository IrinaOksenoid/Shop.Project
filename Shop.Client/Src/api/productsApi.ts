import axios from 'axios';
import { IProduct, IRelatedProduct } from '@Shared/types'; 

const API_URL = process.env.REACT_APP_API_URL || '/api';

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axios.get<IProduct[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка товаров:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<IProduct> => {
  try {
    const response = await axios.get<IProduct>(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении товара с ID ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData: IProduct): Promise<IProduct> => {
  try {
    const response = await axios.post<IProduct>(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    throw error;
  }
};

export const fetchProductSummary = async (): Promise<{ totalProducts: number, totalPrice: number }> => {
  try {
    const response = await axios.get<{ totalProducts: number, totalPrice: number }>(`${API_URL}/products/summary`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных о товарах:', error);
    throw error;
  }
};

export const fetchRelatedProducts = async (id: string): Promise<IRelatedProduct[]> => {
  try {
    const response = await axios.get<IRelatedProduct[]>(`${API_URL}/products/${id}/related`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении похожих товаров для товара с ID ${id}:`, error);
    throw error;
  }
};

