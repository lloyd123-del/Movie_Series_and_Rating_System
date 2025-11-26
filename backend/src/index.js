import "dotenv/config.js";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import moviesRoutes from "./routes/movieRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
});
