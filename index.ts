require('dotenv').config();
import { Express } from "express";
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import ShopAPI from "./Shop.API";
import ShopAdmin from "./Shop.Admin";

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

        // Пример использования переменной в другом маршруте
        server.use("/", (_, res) => {
            isLoginPage = false;  // Возвращаем значение в false для других страниц
            res.send("React App");
        });
    }
}

launchApplication();
