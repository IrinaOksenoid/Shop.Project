export interface IProductEditData {
    title: string;
    description: string;
    price: string;
    mainImage: string;
    newImages?: string;
    commentsToRemove?: string | string[];
    imagesToRemove?: string | string[];
    relatedProductsToAdd?: string | string[];      // Товары для добавления в "похожие"
    relatedProductsToRemove?: string | string[];   // Товары для удаления из "похожих"
}