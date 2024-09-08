import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();


//const host: string = process.env.LOCAL_PATH || 'localhost';
//const port: number = Number(process.env.LOCAL_PORT) || 3000;

export function initServer(): Express {
    const host = process.env.LOCAL_PATH;
    const port = Number(process.env.LOCAL_PORT);

    if (!host) {
        throw new Error("Environment variable LOCAL_HOST is not defined");
    }

    if (!port) {
        throw new Error("Environment variable LOCAL_PORT is not defined");
    }

    const app = express();

    const jsonMiddleware = express.json();
    app.use(jsonMiddleware);

    app.listen(Number(port), host, () => {
       console.log(`Server running on port ${port}`);
    });

    return app;
}