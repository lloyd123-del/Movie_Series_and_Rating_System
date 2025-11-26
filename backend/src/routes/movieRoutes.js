import express from "express";
import Movies from "../models/Movies.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const {
            title,
            genre,
            releaseYear,
            description,
            duration,
            director,
        } = req.body;

        if (!title || !genre || !releaseYear) {
            return res.status(400).json({
                message: "Title, genre, and releaseYear are required"
            });
        }

        const movie = new Movies({
            title,
            genre,
            releaseYear,
            description,
            duration,
            director,
            posterUrl
        });

        await movie.save();

        res.status(201).json({
            message: "Movie saved successfully",
            movie
        });

    } catch (error) {
        console.log("Error POSTING movie:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
