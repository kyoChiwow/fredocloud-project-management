import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";
import { Request } from "express";
import { Response } from "express";

const app = express();

app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to FredoCloud Project Management System!",
    })
})

export default app;