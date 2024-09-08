import { Response } from "express";

// export const throwServerError = (res: Response, e: unknown) => {
//     if (e instanceof Error) {
//         console.debug(e.message);
//         res.status(500).send("Something went wrong");
//     } else {
//         console.error("An unknown error occurred", e);
//         res.status(500).send("Something went wrong");
//     }
// };

export const throwServerError = (res: Response, e: unknown) => {
    if (e instanceof Error) {
        // Логируем полное сообщение об ошибке и стек вызовов для точной отладки
        console.error("Server error:", e.message);
        console.error("Stack trace:", e.stack);
        res.status(500).send(`Something went wrong: ${e.message}`);
    } else {
        // Логируем случай, когда ошибка неизвестного типа
        console.error("An unknown error occurred:", e);
        res.status(500).send("Something went wrong");
    }
};
