import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import cardRouter from "./routes/cardRouter.js";

const app = express();
app.use(json());
app.use(cors());
app.use(cardRouter);
app.use(errorHandlerMiddleware);

export { app };
