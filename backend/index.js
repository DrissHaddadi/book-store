import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

// Middleware to parse request body
app.use(express.json());

// Middleware to handle CORS policies
// Option 1 : Allow All Origins with Default of cors(*). Essentially removes the security mesure from CORS.
//app.use(cors());
//Option 2 : Allow Custom Origins. It is far more secured
app.use(
  cors({
    origin: ["http://localhost:5555", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to my Book Store");
});

app.use("/books", booksRoutes);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
