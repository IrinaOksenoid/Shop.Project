export interface IProductEditData {
    title: string;
    description: string;
    price: string;
    mainImage: string;
    newImages?: string;
    commentsToRemove?: string | string[];
    imagesToRemove?: string | string[];
    relatedProductsToAdd?: string | string[];      
    relatedProductsToRemove?: string | string[];   
}