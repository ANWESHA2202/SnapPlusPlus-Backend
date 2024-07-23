import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import streakRouter from "./routes/streak-routes.js";

const app = express();
config();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/users/streaks", streakRouter);

mongoose
  .connect(
    `mongodb+srv://ShivangiSingh:shivangi123@promptbook.dfmmvsd.mongodb.net/?retryWrites=true&w=majority&appName=Promptbook`
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err, "error");
  });
