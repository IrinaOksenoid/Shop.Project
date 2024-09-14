import { Request, Response, Router } from "express";
import {
    IProductEntity,
    ICommentEntity,
    IProductSearchFilter,
    ProductCreatePayload,
    IImageEntity,
    ProductAddImagesPayload,
    ImagesRemovePayload,
    IRelatedProductEntity
} from './../../types';
import { IComment, IProduct, IImage } from "@Shared/types";
import { mapProductsEntity, mapCommentsEntity, mapImagesEntity, mapImageEntity, mapRelatedProductsEntity, mapOtherProductsEntity  } from '../services/mapping';
import { connection } from '../../index';
import { enhanceProductsComments, getProductsFilterQuery, enhanceProductsImages } from '../helpers';
import {
    INSERT_PRODUCT_QUERY,
    INSERT_IMAGES_QUERY,
    DELETE_IMAGES_QUERY,
    //INSERT_PRODUCT_IMAGES_QUERY,
    REPLACE_PRODUCT_THUMBNAIL,
    UPDATE_PRODUCT_FIELDS,
    GET_RELATED_PRODUCTS_QUERY,
    INSERT_RELATED_PRODUCT_QUERY,
    DELETE_RELATED_PRODUCT_QUERY,
    GET_OTHER_PRODUCTS_QUERY
} from '../services/queries';
import { OkPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { throwServerError } from "../../../Shop.Admin/controllers/ helper";
import { param, body, validationResult } from "express-validator";

export const productsRouter = Router();

productsRouter.get('/search', async (
    req: Request<{}, {}, {}, IProductSearchFilter>,
    res: Response
) => {
    try {
        if (!connection) {
            res.status(500).send("Database connection not established products-api");
            return;
        }
        if (!Object.keys(req.query).length){
            res.status(400);
            res.send("Filter is empty");
            return;
        }
        const [query, values] = getProductsFilterQuery(req.query);
        const [rows] = await connection.query<IProductEntity[]>(query, values);

        if (!rows?.length) {
            res.status(404);
            res.send(`Products are not found`);
            return;
        }

        const [commentRows] = await connection.query<ICommentEntity[]>(
            "SELECT * FROM comments"
        );
        const [imageRows] = await connection.query<IImageEntity[]>(
            "SELECT * FROM images"
        );

        const products = mapProductsEntity(rows);
        const withComments = enhanceProductsComments(products, commentRows);
        const withImages = enhanceProductsImages(withComments, imageRows)
       
        res.send(withImages);
    } catch (e) {
        throwServerError(res, e);
    }
});   

productsRouter.get('/', async (req: Request, res: Response) => {
    if (!connection) {
        res.status(500).send("Database connection not established products-api");
        return;
    }
    try {
        const [productRows] = await connection.query<IProductEntity[]>(
            "SELECT * FROM products"
        );

        const [commentRows] = await connection.query<ICommentEntity[]>(
            "SELECT * FROM comments"
        );

        const [imageRows] = await connection.query<IImageEntity[]>(
            "SELECT * FROM images"
        );

        const products = mapProductsEntity(productRows);
        const withComments = enhanceProductsComments(products, commentRows);
        const withImages = enhanceProductsImages(withComments, imageRows)
        

        res.send(withImages);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/:id', async (
    req: Request<{ id: string }>,
    res: Response
) => {
    if (!connection) {
        res.status(500).send("Database connection not established products-api");
        return;
    }
    try {
        const [rows] = await connection.query<IProductEntity[]>(
            "SELECT * FROM products WHERE product_id = ?",
            [req.params.id]
        );

        if (!rows?.[0]) {
            res.status(404);
            res.send(`Product with id ${req.params.id} is not found products-api`);
            return;
        }

        const [comments] = await connection.query<ICommentEntity[]>(
            "SELECT * FROM comments WHERE product_id = ?",
            [req.params.id]
        );

        const [images] = await connection.query<IImageEntity[]>(
            "SELECT * FROM images WHERE product_id = ?",
            [req.params.id]
        );

        const product = mapProductsEntity(rows)[0];

        if (comments.length) {
            product.comments = mapCommentsEntity(comments);
        }

        if (images.length) {
            product.images = mapImagesEntity(images);
            product.thumbnail = product.images.find(image => image.main) || product.images[0];
        }

        res.send(product);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/', async (
    req: Request<{}, {}, ProductCreatePayload>,
    res: Response
) => {
    try {
        if (!connection) {
            res.status(500).send("Database connection not established products-api");
            return;
        }
        const { title, description, price, images } = req.body;
        const id = uuidv4();
        await connection.query<OkPacket>(
            INSERT_PRODUCT_QUERY,
            [id, title || null, description || null, price || null]
        );

        if (images) {
            const values = images.map((image) => [uuidv4(), image.url, id, image.main]);
            await connection.query<OkPacket>(INSERT_IMAGES_QUERY, [values]);
        }

        // Извлекаем только что добавленный товар из базы данных
        const [productRows] = await connection.query<IProductEntity[]>(
            "SELECT * FROM products WHERE product_id = ?",
            [id]
        );

        if (!productRows?.[0]) {
            res.status(404).send("Created product not found");
            return;
        }

        // Если были добавлены изображения, извлекаем их тоже
        const [imageRows] = await connection.query<IImageEntity[]>(
            "SELECT * FROM images WHERE product_id = ?",
            [id]
        );

        // Используем функции маппинга для создания IProduct объекта
        const newProduct = mapProductsEntity([productRows[0]])[0];
        newProduct.images = mapImagesEntity(imageRows);
        newProduct.thumbnail = imageRows.length > 0 
            ? mapImageEntity(imageRows.find(image => image.main) || imageRows[0])
            : undefined;

        // Возвращаем новый продукт
        res.status(201).json(newProduct);
    } catch (e) {
        throwServerError(res, e);
    }
});


productsRouter.post('/add-images', async (
    req: Request<{}, {}, ProductAddImagesPayload>,
    res: Response
) => {
    try {
        if (!connection) {
            res.status(500).send("Database connection not established products-api");
            return;
         }

        const { productId, images } = req.body;

        if (!images?.length) {
            res.status(400);
            res.send("Images array is empty");
            return;
        }

        const values = images.map((image) => [uuidv4(), image.url, productId, image.main]);
        await connection.query<OkPacket>(INSERT_IMAGES_QUERY, [values]);

        res.status(201);
        res.send(`Images for a product id:${productId} have been added!`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/remove-images', async (
    req: Request<{}, {}, ImagesRemovePayload>,
    res: Response
) => {
    try {
        if (!connection) {
            res.status(500).send("Database connection not established");
            return;
        }
        const imagesToRemove = req.body;

        if (!imagesToRemove?.length) {
            res.status(400);
            res.send("Images array is empty");
            return;
        }

        const [info] = await connection.query<OkPacket>(DELETE_IMAGES_QUERY, [[imagesToRemove]]);

        if (info.affectedRows === 0) {
            res.status(404);
            res.send("No one image has been removed");
            return;
        }

        res.status(200);
        res.send(`Images have been removed!`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/update-thumbnail/:id', 
    [
        param('id').isUUID().withMessage('Product id is not UUID'),
        body('newThumbnailId')
            .notEmpty().withMessage('New Thumbnail id is empty')
            .isUUID().withMessage('New Thumbnail id is not UUID')
    ],
    async (
    req: Request<{ id: string }, {}, { newThumbnailId: string }>,
    res: Response
) => {
    try {
        if (!connection) {
            res.status(500).send("Database connection not established");
            return;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const [currentThumbnailRows] = await connection.query<IImageEntity[]>(
            "SELECT * FROM images WHERE product_id=? AND main=?",
            [req.params.id, 1]
        );

        if (!currentThumbnailRows?.length || currentThumbnailRows.length > 1) {
            res.status(400);
            res.send("Incorrect product id");
            return;
        }
        const [newThumbnailRows] = await connection.query<IImageEntity[]>(
            "SELECT * FROM images WHERE product_id=? AND image_id=?",
            [req.params.id, req.body.newThumbnailId]
        );

        if (newThumbnailRows?.length !== 1) {
            res.status(400);
            res.send("Incorrect new thumbnail id");
            return;
        }

        const currentThumbnailId = currentThumbnailRows[0].image_id;
        const [info] = await connection.query<OkPacket>(
            REPLACE_PRODUCT_THUMBNAIL,
            [currentThumbnailId, req.body.newThumbnailId, currentThumbnailId, req.body.newThumbnailId]
        );

        if (info.affectedRows === 0) {
            res.status(404);
            res.send("No one image has been updated");
            return;
        }

        res.status(200);
        res.send("New product thumbnail has been set!");
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.patch('/:id', async (
    req: Request<{ id: string }, {}, ProductCreatePayload>,
    res: Response
) => {
    try {
        if (!connection) {
            res.status(500).send("Database connection not established");
            return;
        }
        const { id } = req.params;

        const [rows] = await connection.query<IProductEntity[]>(
            "SELECT * FROM products WHERE product_id = ?",
            [id]
        );

        if (!rows?.[0]) {
            res.status(404);
            res.send(`Product with id ${id} is not found`);
            return;
        }

        const currentProduct = rows[0];
        await connection.query<OkPacket>(
            UPDATE_PRODUCT_FIELDS,
            [
                req.body.hasOwnProperty("title") ? req.body.title : currentProduct.title,
                req.body.hasOwnProperty("description") ? req.body.description : currentProduct.description,
                req.body.hasOwnProperty("price") ? req.body.price : currentProduct.price,
                id
            ]
        );

        res.status(200);
        res.send(`Product id:${id} has been added!`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/:id/related', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!connection) {
            res.status(500).send("Database connection not established");
            return;
        }
        const [relatedProductsRows] = await connection.query<IRelatedProductEntity[]>(
            GET_RELATED_PRODUCTS_QUERY,
            [id]
        );

        if (!relatedProductsRows.length) {
            res.status(200).json([]);  
            return;
        }

        
        const relatedProducts = mapRelatedProductsEntity(relatedProductsRows);
        
        res.status(200).json(relatedProducts);
    } catch (e) {
        throwServerError(res, e);
    }
});


productsRouter.post('/related/add', [
    body().isArray().withMessage('Body must be an array of product pairs'),
    body('*.product_id').isUUID().withMessage('Product ID must be a valid UUID'),
    body('*.related_product_id').isUUID().withMessage('Related Product ID must be a valid UUID')
], async (req: Request<{}, {}, { product_id: string; related_product_id: string }[]>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const pairs = req.body;

    try {
        if (!connection) {
            res.status(500).send("Database connection not established");
            return;
        }

        
        for (const pair of pairs) {
            await connection.query(INSERT_RELATED_PRODUCT_QUERY, [pair.product_id, pair.related_product_id]);
        }

        res.status(201).send('Related products have been added');
    } catch (e) {
        throwServerError(res, e);
    }
});


productsRouter.delete('/related/remove', async (req: Request, res: Response) => {
    const productsToRemove = req.body;  

    if (!productsToRemove || productsToRemove.length === 0) {
        return res.status(400).send('No related products selected for removal');
    }

    try {
        if (!connection) {
            return res.status(500).send("Database connection not established");
        }

        
        for (const { product_id, related_product_id } of productsToRemove) {
            
            await connection.query(DELETE_RELATED_PRODUCT_QUERY, [product_id, related_product_id]);
        }

        res.status(200).send('Selected related products have been removed');
    } catch (e) {
        throwServerError(res, e);
    }
});


productsRouter.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        if (!connection) {
            res.status(500).send("Database connection not established");
            return;
        }

        const { id } = req.params;
        
        await connection.query(
            `DELETE FROM related_products WHERE product_id = ? OR related_product_id = ?`,
            [id, id]
        );

        await connection.query<OkPacket>(
            "DELETE FROM images WHERE product_id = ?",
            [id]
        );
        
        await connection.query<OkPacket>(
            "DELETE FROM comments WHERE product_id = ?",
            [id]
        );

        const [info] = await connection.query<OkPacket>(
            "DELETE FROM products WHERE product_id = ?",
            [id]
        );

        if (info.affectedRows === 0) {
            res.status(404).send(`Product with id ${id} is not found`);
            return;
        }

        res.status(200).send(`Product with id ${id} has been deleted along with related products, images and comments`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/:id/not-related', async (req: Request<{ id: string }>, res: Response) => {
    try {
        if (!connection) {
            res.status(500).send("Database connection not established");
            return;
        }
        const { id } = req.params;

        const [otherProductsRows] = await connection.query<IProductEntity[]>(
            GET_OTHER_PRODUCTS_QUERY,
            [id, id]  
        );
        const otherProducts = mapOtherProductsEntity(otherProductsRows);
        res.status(200).json(otherProducts);
    } catch (e) {
        throwServerError(res, e);
    }
});
