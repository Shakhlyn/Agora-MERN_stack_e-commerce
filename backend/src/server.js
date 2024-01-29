// if (process.env.NODE_ENV === "development") {
//   import dotenv from "dotenv";
//   dotenv.config({ path: "dotenv.env" });
// }

import dotenv from "dotenv";
// if (process.env.NODE_ENV === "development") {
dotenv.config({ path: "dotenv.env" });
// }

import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

import { notFound, errorHanlder } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = process.env.PORT;

connectDB(); //connect to the mongodb database.

const app = express();

// set security HTTP headers
app.use(helmet());

// Limit requests from same IP
const apiLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "You've exceeded the maximum number of requests. Try again later.",
});

const loginLimiter = rateLimit({
  max: 10,
  windowMs: 3600 * 1000,
  message: "Too many log-in in a short time!!! Try again later",
});

app.use("/api", apiLimiter);
app.use("/api/users/login", loginLimiter);

app.use(express.json()); //body parser
app.use(urlencoded({ extended: true }));

// CORS
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.CLIENT_DEV_ORIGIN
        : process.env.CLIENT_PRODUCTION_ORIGIN,
  })
);
// app.use(cors({}));
app.use(cookieParser({ sameSite: "Strict", secure: true }));

// Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize());

// testing middleware:
app.use((req, res, next) => {
  // console.log(`req.cookies.jwt: server : ${req.cookies.jwt}`);
  // console.log(`req.user from server.js ${req.user}`);
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFound);
app.use(errorHanlder);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
