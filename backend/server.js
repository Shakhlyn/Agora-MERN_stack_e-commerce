import express from "express";
import dotenv from "dotenv";
dotenv.config();

import products from "./data/products.js";

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    port: `${port}`,
    message: "Got it!",
  });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
