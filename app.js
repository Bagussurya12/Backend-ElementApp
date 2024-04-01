import express from "express";
import dotenv from "dotenv";
import pkg from "pg";

import indexRouter from "./routes/index.js";

const { Pool } = pkg;
const env = dotenv.config().parsed;
const pool = new Pool({
  user: env.DB_USERNAME,
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
});

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// Koneksi ke PostgreSQL
pool.connect((err) => {
  if (err) {
    console.error("Failed to connect to PostgreSQL:", err);
  } else {
    console.log(`Connected to PostgreSQL database : ${env.DB_DATABASE}`);
  }
});

app.listen(env.APP_PORT, () => {
  console.log(`Server Running On Port ${env.APP_PORT}`);
});
