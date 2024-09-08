import {
    CommentCreatePayload,
    ICommentEntity,
    IProductEntity,
    IImageEntity,
    IRelatedProductEntity
} from "./../../types";
import { IComment ,IImage, IProduct, IRelatedProduct} from "@Shared/types";
export const mapCommentEntity = ({
    comment_id, product_id, ...rest
}: ICommentEntity): IComment => {
    return {
        id: comment_id,
        productId: product_id,
        ...rest
    }
}

export const mapCommentsEntity = (data: ICommentEntity[]): IComment[] => {
    return data.map(mapCommentEntity);
}

export const mapProductsEntity = (data: IProductEntity[]): IProduct[] => {
    return data.map(({ product_id, title, description, price }) => ({
        id: product_id,
        title: title || "",
        description: description || "",
        price: Number(price) || 0
    }))
}

export const mapImageEntity = ({image_id, url, product_id,  main}: IImageEntity): IImage => {
    return {
        id: image_id,
        url: url,
        productId: product_id,
        main: Boolean(main)
    };
};

// Функция маппинга отдельного связанного товара
export const mapRelatedProductEntity = ({
    related_product_id,
    related_product_title,
    related_product_description,
    related_product_price
}: IRelatedProductEntity): IRelatedProduct => {
    return {
        id: related_product_id,
        title: related_product_title || "",
        description: related_product_description || "",
        price: Number(related_product_price) || 0
    };
};

// Функция маппинга массива связанных товаров
export const mapRelatedProductsEntity = (data: IRelatedProductEntity[]): IRelatedProduct[] => {
    return data.map(mapRelatedProductEntity);
};


export const mapImagesEntity = (data: IImageEntity[]): IImage[] => {
    return data.map(mapImageEntity);
}

export const mapOtherProductEntity = ({
    product_id,
    title,
    description,
    price
}: IProductEntity): IProduct => {
    return {
        id: product_id,
        title: title || "",
        description: description || "",
        price: Number(price) || 0
    };
};

export const mapOtherProductsEntity = (data: IProductEntity[]): IProduct[] => {
    return data.map(mapOtherProductEntity);
};
