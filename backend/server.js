import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import { notFound, errorHanlder } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
// import Product from "./Models/productModel.js";

const port = process.env.PORT;

connectDB(); //connect to the mongodb database.

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    port: `${port}`,
    message: "Got it!",
  });
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHanlder);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
