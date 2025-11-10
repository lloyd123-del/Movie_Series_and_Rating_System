import "dotenv/config.js";
import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
    console.log(`Server is running on PORT ${PORT}`)
})