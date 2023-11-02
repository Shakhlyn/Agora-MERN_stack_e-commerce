import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import { notFound, errorHanlder } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const port = process.env.PORT;

connectDB(); //connect to the mongodb database.

const app = express();

app.use(express.json()); //body parser
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser({ sameSite: "Strict", secure: true }));

// app.post("/api/orders", (req, res) => {
//   console.log(`req.user: ${req.user}`);
//   res.status(200).json({
//     port: `${port}`,
//     message: "Got it!",
//   });
// });

// testing middleware:
app.use((req, res, next) => {
  // console.log(`req.cookies.jwt: server : ${req.cookies.jwt}`);
  console.log(`req.user from server.js ${req.user}`);
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHanlder);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
