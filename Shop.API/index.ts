import express, { Express } from "express";
import { Connection } from "mysql2/promise";
//import { initDataBase } from "./src/services/db";
//import { initServer } from "./src/services/server";
import { commentsRouter } from "./src/api/comments-api";
import { productsRouter } from "./src/api/products-api";
import { authRouter } from "./src/api/auth-api";

//export let server: Express;
export let connection: Connection | null = null; 
//const ROOT_PATH = '/api';
//const PORT = 3000;

 export default function (dbConnection: Connection): Express {
        const app = express();
        app.use(express.json());
    
        connection = dbConnection;
    
        app.use("/comments", commentsRouter);
        app.use("/products", productsRouter);
        app.use("/auth", authRouter);

        return app;
    }
/*async function launchApplication() {
    server = initServer();
    connection = await initDataBase(); 

    if (!connection) {
        console.error("Failed to connect to the database");
    }
    initRouter();
    
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

function initRouter() {
    server.use(`${ROOT_PATH}/comments`, commentsRouter);
    server.use(`${ROOT_PATH}/products`, productsRouter);
}

launchApplication();*/


