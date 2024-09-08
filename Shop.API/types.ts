import { RowDataPacket } from "mysql2/index";
import { IComment, IImage, IProduct, IAuthRequisites, IProductFilterPayload } from "@Shared/types";

export interface IProductSearchFilter extends IProductFilterPayload { }

export interface ICommentEntity extends RowDataPacket {
    comment_id: string;
    name: string;
    email: string;
    body: string;
    product_id: string;
}

export type ImageCreatePayload = Omit<IImage, "id" | "productId">;

export interface IImageEntity extends RowDataPacket {
    image_id: string;
    url: string;
    product_id: string;
    main: number;
}

//export interface IProductSearchFilter {
//    title?: string;
//    description?: string;
//    priceFrom?: number;
//    priceTo?: number;
//}

export interface IProductEntity extends IProduct, RowDataPacket {
    product_id: string;
}

export type CommentCreatePayload = Omit<IComment, "id">;

export type CommentValidator = (comment: CommentCreatePayload) => string | null;


export type ProductCreatePayload =
    Omit<IProduct,
        "id" | "comments" | "thumbnail" | "images"> & { images: ImageCreatePayload[] };

export interface ProductAddImagesPayload {
    productId: string;
    images: ImageCreatePayload[];
}

export type ImagesRemovePayload = string[];


export interface IUserRequisitesEntity extends IAuthRequisites, RowDataPacket {
    id: number;
}   

export interface IRelatedProductEntity extends RowDataPacket {
    product_id: string;
    related_product_id: string;
    related_product_title: string;
    related_product_description: string;
    related_product_price: number;
}
