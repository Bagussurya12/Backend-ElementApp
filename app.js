import express from "express";
import dotenv from "dotenv";
import connection from "./connection.js";

import indexRouter from "./routes/index.js";

const env = dotenv.config().parsed;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// Koneksi ke PostgreSQL
connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to PostgreSQL:", err);
  } else {
    console.log(`Connected to PostgreSQL database : ${env.DB_DATABASE}`);
  }
});

app.listen(env.APP_PORT, () => {
  console.log(`Server Running On Port ${env.APP_PORT}`);
});
