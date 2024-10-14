export interface IComment {
    id: string;
    name: string;
    email: string;
    body: string;
    productId: string;
}

export interface IImage {
    id: string;
    url: string;
    productId: string;
    main: boolean;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    comments?: IComment[];
    images?: IImage[];
    thumbnail?: IImage;
    relatedProducts?: IRelatedProduct[];
}

export interface IProductFilterPayload {
    title?: string;
    description?: string;
    priceFrom?: number;
    priceTo?: number;
}


export interface IAuthRequisites {
    username: string;
    password: string;
}   

export interface IRelatedProduct {
    id: string;
    title: string;
    description: string;
    price: number;
}

export interface INewProductPayload {
    title: string;
    description: string;
    price: number;
}