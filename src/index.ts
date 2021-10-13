import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import UserRouter from "@routes/user";
import { connectToDatabase } from "@configs/database";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", UserRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log("Server running");
  } catch (error) {
    console.log(error);
  }
});
