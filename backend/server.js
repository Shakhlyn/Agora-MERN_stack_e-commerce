import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import { notFound, errorHanlder } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import Product from "./Models/productModel.js";

const port = process.env.PORT;

connectDB(); //connect to the mongodb database.

const app = express();

app.use(express.json()); //body parser
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    port: `${port}`,
    message: "Got it!",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHanlder);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
