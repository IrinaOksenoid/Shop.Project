import { Router, Request, Response } from "express";
import { getProducts, searchProducts, removeProduct, getProduct, updateProduct, getRelatedProducts, getOtherProducts, createProduct } from "../models/products.model";
import { IProductFilterPayload, INewProductPayload } from "@Shared/types";
import { IProductEditData } from "../types"
import { throwServerError } from "./ helper";

declare module 'express-session' {
    interface SessionData {
        username: string;
    }
}


//import { authRouter } from "./auth.controller";

export const productsRouter = Router();
//export const authRouter = Router();
productsRouter.use((req: Request, res: Response, next) => {
    res.locals.isLoginPage = false;  // Это не страница логина, поэтому false
    next();
});
    

 productsRouter.get('/', async (req: Request, res: Response) => {
    try {
        console.log('username', req.session.username);
        const products = await getProducts();
        res.render("products", { items: products , queryParams: {}});
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/search', async (
    req: Request<{}, {}, {}, IProductFilterPayload>,
    res: Response
) => {
    try {
        const products = await searchProducts(req.query);
        res.render("products", {
            items: products,
            queryParams: req.query
        });
    } catch (e) {
        throwServerError(res, e);
    }
});


productsRouter.get('/remove-product/:id', async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        if (req.session.username !== "admin") {
            res.status(403);
            res.send("Forbidden");
            return;
          }
      
        await removeProduct(req.params.id);
        res.redirect(`/${process.env.ADMIN_PATH}`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/save/:id', async (
    req: Request<{ id: string }, {}, IProductEditData>,
    res: Response
) => {
    try {
        await updateProduct(req.params.id, req.body);
        res.redirect(`/${process.env.ADMIN_PATH}/${req.params.id}`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/new-product', async (req: Request, res: Response) => {
    try {
        res.render("product/new-product");
    } catch (e) {
        throwServerError(res, e);
    }
});

// Обрабатываем сохранение нового продукта
productsRouter.post('/new-product', async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body;

        // Формируем данные для создания продукта
        const newProductData: INewProductPayload = {
            title,
            description,
            price: Number(price)
        };

        // Создаем новый продукт через API
        const createdProduct = await createProduct(newProductData);

        // Редирект на страницу созданного продукта
        res.redirect(`/${process.env.ADMIN_PATH}/${createdProduct.id}`);
    } catch (e) {
        throwServerError(res, e);
    }
});
  

productsRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const product = await getProduct(req.params.id);
        const relatedProducts = await getRelatedProducts(req.params.id);
        const otherProducts = await getOtherProducts(req.params.id);

        if (product) {
            res.render("product/product", {
                item: {
                ...product,
                relatedProducts: relatedProducts,
                otherProducts: otherProducts
                }
            });
        } else {
            res.render("product/empty-product", {
                id: req.params.id
            });
        }
    } catch (e) {
        throwServerError(res, e);
    }
});
