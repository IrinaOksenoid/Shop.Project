require('dotenv').config();
import express, { Express } from "express";
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import ShopAPI from "./Shop.API";
import ShopAdmin from "./Shop.Admin";
import path from 'path';

export let server: Express;
export let connection: Connection | null = null; 

export let isLoginPage: boolean = false;

async function launchApplication() {
    if (!connection) {
        console.error("Failed to connect to the database - index shop");
    }

    server = initServer();
    connection = await initDataBase(); 

    initRouter();
}

function initRouter() {
    if (!connection) {
        console.error("Failed to connect to the database index shop");
    } else {
        const shopApi = ShopAPI(connection);
        server.use("/api", shopApi);

        const shopAdmin = ShopAdmin();
        server.use("/admin", shopAdmin);

        server.use("/admin/auth/login", (req, res) => {
            isLoginPage = true;  
            res.render("login"); 
        });

        const clientBuildPath = path.join(__dirname, "Shop.Client/build");
        server.use(express.static(clientBuildPath));

        server.get("/*", (_, res) => {
            isLoginPage = false;
            res.sendFile(path.join(clientBuildPath, "index.html"));
        });
    }
}

launchApplication();
