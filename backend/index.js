import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

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
