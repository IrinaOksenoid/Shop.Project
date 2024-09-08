import { Router, Request, Response } from "express";
import { getProducts, searchProducts, removeProduct, getProduct, updateProduct, getRelatedProducts, getOtherProducts } from "../models/products.model";
import { IProductFilterPayload } from "@Shared/types";
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
  