import { Response } from "express";

export const throwServerError = (res: Response, e: unknown) => {
    if (e instanceof Error) {
        console.error("Server error:", e.message);
        console.error("Stack trace:", e.stack);
        res.status(500).send(`Something went wrong: ${e.message}`);
    } else {
        console.error("An unknown error occurred:", e);
        res.status(500).send("Something went wrong");
    }
};
