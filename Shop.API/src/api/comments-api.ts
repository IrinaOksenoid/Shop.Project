import { CommentCreatePayload, ICommentEntity } from './../../types'
import { IComment } from "@Shared/types";
import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validateComment } from "./../helpers";
import { connection } from '../../index';
import { mapCommentsEntity } from "../services/mapping";
import { OkPacket } from 'mysql2';
import { COMMENT_DUPLICATE_QUERY, INSERT_COMMENT_QUERY } from '../services/queries'
import { param, validationResult } from "express-validator";
const commentsRouter = Router();

commentsRouter.get("/", async (req: Request, res: Response) => {
    if (!connection) {
        res.status(500).send("Database connection not established - comments-api");
        return;
    }
    try {
        const [comments] = await connection.query<ICommentEntity[]>(
            "SELECT * FROM comments"
        );

        res.setHeader("Content-Type", "application/json");
        res.send(mapCommentsEntity(comments));
    } catch (e) {
        if (e instanceof Error) { 
        console.debug(e.message);
        res.status(500);
            res.send("Something went wrong comments-api");
    }
    else {
            console.error(e);
    }
    }
});

commentsRouter.get(`/:id`, 
    [
        param('id').isUUID().withMessage('Comment id is not UUID')
    ],
    async (req: Request<{ id: string }>, res: Response) => {
    if (!connection) {
        res.status(500).send("Database connection not established comments-api");
        return;
    }
    try {
        const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400);
                    res.json({ errors: errors.array() });
                    return;
                }
        const [rows] = await connection.query<ICommentEntity[]>(
            "SELECT*FROM comments WHERE comment_ID = ?",
            [req.params.id]
        );

        if (!rows?.[0]) {
            res.status(404);
            res.send(`Comment with id ${req.params.id} is not found comments-api`);
            return;
        }

        res.setHeader('Content-Type', "application/json");
        res.send(mapCommentsEntity(rows)[0]);

    } catch (e) {
        if (e instanceof Error) {
            console.debug(e.message);
            res.status(500);
            res.send("Something went wrong comments-api");
        }
        else {
            console.error(e);
        }
    }
 });


commentsRouter.post('/', async (
    req: Request<{}, {}, CommentCreatePayload>,
    res: Response) => {
    const validationResult = validateComment(req.body);

    if (validationResult) {
        res.status(400);
        res.send(validationResult);
        return;
    }

   
    try {
        const { name, email, body, productId } = req.body;


        if (!connection) {
            res.status(500).send("Database connection not established comments-api");
            return;
        }
        else {
            const [sameResult] = await connection.query<ICommentEntity[]>(
                COMMENT_DUPLICATE_QUERY,
                [email.toLowerCase(), name.toLowerCase(), body.toLowerCase(), productId]
            );

            console.log(sameResult[0]?.comment_id);

            if (sameResult.length) {
                res.status(422);
                res.send("Comment with the same fields already exists comments-api");
                return;
            }


            const id = uuidv4();
            

            const [info] = await connection.query<OkPacket>(INSERT_COMMENT_QUERY, [
                id,
                email,
                name,
                body,
                productId,
            ]);

            console.log(info);

            res.status(201);
            res.send(`Comment id:${id} has been added!`);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            console.debug(e.message);
            res.status(500);
            res.send("Server error.Comment has not been created comments-api");
        }
        else {
            console.error(e);
        }
    }
});   

commentsRouter.patch('/', async (
    req: Request<{}, {}, Partial<IComment>>,
    res: Response
) => {
    try {
        let updateQuery = "UPDATE comments SET ";

        const valuesToUpdate: (string | number)[] = [];
        ["name", "body", "email"].forEach(fieldName => {
            if (req.body.hasOwnProperty(fieldName)) {
                const value = req.body[fieldName as keyof IComment]; 
                if (value !== undefined) { 
                    if (valuesToUpdate.length) {
                        updateQuery += ", ";
                    }
                    updateQuery += `${fieldName} = ?`;
                    valuesToUpdate.push(value);
                }
            }
        });

        updateQuery += " WHERE comment_id = ?";
        valuesToUpdate.push(req.body.id as string | number);;
        if (!connection) {
            res.status(500).send("Database connection not established comments-api");
            return;
        }
        else {

            const [info] = await connection.query<OkPacket>(updateQuery, valuesToUpdate);

            if (info.affectedRows === 1) {
                res.status(200);
                res.end();
                return;
            }

            const newComment = req.body as CommentCreatePayload;
            const validationResult = validateComment(newComment);

            if (validationResult) {
                res.status(400);
                res.send(validationResult);
                return;
            }

            const id = uuidv4();
            await connection.query<OkPacket>(
                INSERT_COMMENT_QUERY,
                [id, newComment.email, newComment.name, newComment.body, newComment.productId]
            );

            res.status(201);
            res.send({ ...newComment, id })
        }
        } catch (e) {
            if (e instanceof Error) {
                console.debug(e.message);
                res.status(500);
                res.send("Server error");
            }
            else {
                console.error(e);
            }
        }
    
});

commentsRouter.delete(`/:id`, async (req: Request<{ id: string }>, res: Response) => {
    if (!connection) {
        res.status(500).send("Database connection not established comments-api");
        return;
    }
    try {
        const [info] = await connection.query<OkPacket>(
            "DELETE FROM comments WHERE comment_id = ?",
            [req.params.id]
        );

        if (info.affectedRows === 0) {
            res.status(404);
            res.send(`Comment with id ${req.params.id} is not found comments-api`);
            return;
        }
        res.status(200);
        res.send(`Comment with id ${req.params.id} has been deleted`);
        res.end();


    }
    catch (e) {
        if (e instanceof Error) {
            console.debug(e.message);
            res.status(500);
            res.send("Server Error comments-api. Comment has not been deleted");
        }
        else {
            console.error(e);
        }
    }
});

export { commentsRouter };

