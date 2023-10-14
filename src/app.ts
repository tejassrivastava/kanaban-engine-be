import express from "express";
import cors from "cors";
import { connectDB } from "./db/mongoose";
import baseRouter from "./routes";

// Create an express app
const app: express.Application = express();
connectDB().catch((err) => console.error(err));
app.use(express.json());
app.use(cors());

app.use("/api", baseRouter);

// Start the server on port 3000
const server = app.listen(3000, () => {
  console.log("Server started on port 3000.");
});

export { app, server };
