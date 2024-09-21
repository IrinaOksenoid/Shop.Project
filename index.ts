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

// Создаем глобальную переменную
export let isLoginPage: boolean = false;

async function launchApplication() {
    if (!connection) {
        console.error("Failed to connect to the database - index shop");
    }

    // Инициализация сервера и базы данных
    server = initServer();
    connection = await initDataBase(); 

    // Инициализация маршрутов
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

        // Пример использования глобальной переменной на уровне маршрутов
        server.use("/admin/auth/login", (req, res) => {
            isLoginPage = true;  // Устанавливаем значение переменной при переходе на страницу логина
            res.render("login"); // Рендерим страницу логина
        });

        const clientBuildPath = path.join(__dirname, "shop-client/build");
        server.use(express.static(clientBuildPath));

        // Отдача index.html для всех остальных маршрутов
        server.get("/*", (_, res) => {
            isLoginPage = false;
            res.sendFile(path.join(clientBuildPath, "index.html"));
        });
    }
}

launchApplication();
