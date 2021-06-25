import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express"; 
import "express-async-errors";

import { router } from "./routes";

import "./database"

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());

app.use(router);

// Middleware de tratamento de erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

