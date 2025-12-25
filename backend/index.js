import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.middleware.js";
import donorRoutes from "./routes/donor.routes.js";

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: "https://blood-donation-bank-r68g.vercel.app",
  credentials: true,
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Blood Donation Bank API is running" });
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
