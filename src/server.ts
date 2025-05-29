import express from "express";
import router from "./router";
import colors from "colors";
import { connectDB } from "./config/db";

// Connect to the database
connectDB();

const app = express();
app.use(express.json());

 // Middleware to parse JSON bodies
app.use("/", router);

export default app;