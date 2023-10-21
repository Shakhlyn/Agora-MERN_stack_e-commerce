import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import connectDB from "./config/db.js";
import products from "./data/products.js";

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

app.get("/api/products", (req, res) => {
  res.status(200).json({
    status: "success",
    data: products,
  });
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((el) => el._id === id);
  if (product) {
    res.status(200).json({
      status: "success",
      data: product,
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
