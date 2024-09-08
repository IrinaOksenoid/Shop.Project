import axios from "axios";
import { IProduct, IProductFilterPayload, IRelatedProduct } from "@Shared/types";
import { IProductEditData } from "../types"
import { API_HOST as host } from "./const";
//const host = http://${process.env.LOCAL_PATH}:${process.env.LOCAL_PORT}/${process.env.API_PATH};

export async function getProducts(): Promise<IProduct[]> {
    const { data } = await axios.get<IProduct[]>(`${host}/products`);
    return data || [];
  }
  

export async function searchProducts(
    filter: IProductFilterPayload
): Promise<IProduct[]> {
    const { data } = await axios.get<IProduct[]>(
        `${host}/products/search`,
        { params: filter }
    );
    return data || [];
}  

export async function getProduct(
    id: string
): Promise<IProduct | null> {
    try {
        const { data } = await axios.get<IProduct>(
            `${host}/products/${id}`
        );
        return data;
    } catch (e) {
        console.error(`Error fetching product with id ${id}:`, e);
        return null;
    }
}

export async function removeProduct(id: string): Promise<void> {
    await axios.delete(`${host}/products/${id}`);
}

function splitNewImages(str = ""): string[] {
    return str
        .split(/\r\n|,/g)
        .map(url => url.trim())
        .filter(url => url);
}

function compileIdsToRemove(data: string | string[]): string[] {
    if (typeof data === "string") return [data];
    return data;
}





export async function updateProduct(
    productId: string,
    formData: IProductEditData
): Promise<void> {
    try {
        
        const {
            data: currentProduct
        } = await axios.get<IProduct>(`${host}/products/${productId}`);

        if (!currentProduct) {
            console.error(`Product with id ${productId} not found`);
            return;
        }

        if (formData.commentsToRemove) {
            
            const commentsIdsToRemove = compileIdsToRemove(formData.commentsToRemove);
            const getDeleteCommentActions = () => commentsIdsToRemove.map(commentId => {
                return axios.delete(`${host}/comments/${commentId}`);
            });
            await Promise.all(getDeleteCommentActions());
        }


        if (formData.imagesToRemove) {
            
            const imagesIdsToRemove = compileIdsToRemove(formData.imagesToRemove);
            await axios.post(`${host}/products/remove-images`, imagesIdsToRemove);
        }   

        if (formData.newImages) {
           

            const urls = splitNewImages(formData.newImages);

            const images = urls.map(url => ({ url, main: false }));
            if (!currentProduct.thumbnail) {
                images[0].main = true;
            }
            await axios.post(`${host}/products/add-images`, { productId, images });
        }

        if (formData.mainImage && formData.mainImage !== currentProduct?.thumbnail?.id) {
            
            await axios.post(`${host}/products/update-thumbnail/${productId}`, {
                newThumbnailId: formData.mainImage
            });

        }

        if (formData.relatedProductsToRemove) {
            // Преобразуем в массив, если это строка
            const relatedProductsIds = Array.isArray(formData.relatedProductsToRemove)
                ? formData.relatedProductsToRemove
                : [formData.relatedProductsToRemove];
        
            // Преобразуем каждый элемент в объект с product_id и related_product_id
            const relatedProductsToRemove = relatedProductsIds.map((relatedProductId: string) => ({
                product_id: productId,
                related_product_id: relatedProductId
            }));
        
            // Отправка запроса на удаление связанных продуктов
            await axios.delete(`${host}/products/related/remove`, {
                data: relatedProductsToRemove  // Передаем массив объектов
            });
        }

        if (formData.relatedProductsToAdd) {
            const otherProductsIds = Array.isArray(formData.relatedProductsToAdd)
                ? formData.relatedProductsToAdd
                : [formData.relatedProductsToAdd];

            const relatedProductsToAdd = otherProductsIds.map((relatedProductId: string) => ({
                product_id: productId,
                related_product_id: relatedProductId
            }));

            await axios.post(`${host}/products/related/add`, relatedProductsToAdd);
        }
        
        await axios.patch(`${host}/products/${productId}`, {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price)
        });

    } catch (e) {
        console.log(e); 
    }
}


export async function getRelatedProducts(productId: string): Promise<IRelatedProduct[]> {
    try {
        const { data } = await axios.get<IRelatedProduct[]>(`${host}/products/${productId}/related`);
        return data;
    } catch (e) {
        console.error(`Error fetching related products for product with id ${productId}:`, e);
        return [];
    }
}

export async function getOtherProducts(productId: string): Promise<IProduct[]> {
    try {
        const { data } = await axios.get<IProduct[]>(`${host}/products/${productId}/not-related`);
        return data;
    } catch (e) {
        console.error(`Error fetching not related products for product with id ${productId}:`, e);
        return [];
    }
}