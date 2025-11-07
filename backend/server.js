import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import noteRouter from "./routes/noteRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
const PORT = process.env.PORT;
connectDB();

// --- Middlewares ---
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is working...");
});

// --- API endpoints ---
app.use("/api/note", noteRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});