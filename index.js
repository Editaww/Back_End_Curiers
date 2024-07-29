import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import packagesRouter from "./src/router/package.js";
import curiersRouter from "./src/router/curier.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
  });

app.use(packagesRouter);
app.use(curiersRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "this endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
