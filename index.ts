require('dotenv').config();
import { Express } from "express";
import { Connection } from "mysql2/promise";
//import layouts from "express-ejs-layouts";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import ShopAPI from "./Shop.API";
import ShopAdmin from "./Shop.Admin";


export let server: Express;
//export let connection: Connection;

export let connection: Connection | null = null; 
//const ROOT_PATH = '/api';

async function launchApplication() {
    if (!connection) {
        console.error("Failed to connect to the database - index shop");
    }
    server = initServer();
    connection = await initDataBase(); 

    //if (!connection) {
      //  console.error("Failed to connect to the database index shop");
  //  }
    initRouter();
    
   /* server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });*/
}

function initRouter() {
    if (!connection) {
        console.error("Failed to connect to the database index shop");
    }
    else{

    const shopApi = ShopAPI(connection);
        server.use("/api", shopApi);

        const shopAdmin = ShopAdmin();
        server.use("/admin", shopAdmin);
    
    
        server.use("/", (_, res) => {
            res.send("React App");
        });
    }
}

launchApplication();


