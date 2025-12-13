import express from "express";
import Movies from "../models/movies.js";

const router = express.Router();

// Add a movie
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

// Get all movies
router.get("/", async (req, res) => {
    try {
        const movies = await Movies.find().populate('reviews.user', 'username profileImage');
        res.status(200).json(movies);
    } catch (error) {
        console.log("Error getting movies:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get a single movie by ID
router.get("/:id", async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id).populate('reviews.user', 'username profileImage');
        
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        
        res.status(200).json(movie);
    } catch (error) {
        console.log("Error getting movie:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// CREATE - Add a review to a movie
router.post("/:id/reviews", async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;

        if (!userId || !rating) {
            return res.status(400).json({ 
                message: "User ID and rating are required" 
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ 
                message: "Rating must be between 1 and 5" 
            });
        }

        const movie = await Movies.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Check if user already reviewed this movie
        const existingReview = movie.reviews.find(
            review => review.user.toString() === userId
        );

        if (existingReview) {
            return res.status(400).json({ 
                message: "You have already reviewed this movie" 
            });
        }

        // Add the review
        movie.reviews.push({
            user: userId,
            rating,
            comment: comment || ""
        });

        // Calculate new average rating
        const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
        movie.averageRating = totalRating / movie.reviews.length;

        await movie.save();

        // Populate the user info for the response
        await movie.populate('reviews.user', 'username profileImage');

        res.status(201).json({
            message: "Review added successfully",
            movie
        });

    } catch (error) {
        console.log("Error adding review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// READ - Get all reviews for a movie
router.get("/:id/reviews", async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id)
            .populate('reviews.user', 'username profileImage');

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({
            reviews: movie.reviews,
            averageRating: movie.averageRating
        });

    } catch (error) {
        console.log("Error getting reviews:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// UPDATE - Update a review
router.put("/:movieId/reviews/:reviewId", async (req, res) => {
    try {
        const { movieId, reviewId } = req.params;
        const { userId, rating, comment } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const movie = await Movies.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Find the review
        const review = movie.reviews.id(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if the user owns this review
        if (review.user.toString() !== userId) {
            return res.status(403).json({ 
                message: "You can only update your own reviews" 
            });
        }

        // Update the review
        if (rating !== undefined) {
            if (rating < 1 || rating > 5) {
                return res.status(400).json({ 
                    message: "Rating must be between 1 and 5" 
                });
            }
            review.rating = rating;
        }

        if (comment !== undefined) {
            review.comment = comment;
        }

        // Recalculate average rating
        const totalRating = movie.reviews.reduce((sum, rev) => sum + rev.rating, 0);
        movie.averageRating = totalRating / movie.reviews.length;

        await movie.save();
        await movie.populate('reviews.user', 'username profileImage');

        res.status(200).json({
            message: "Review updated successfully",
            movie
        });

    } catch (error) {
        console.log("Error updating review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE - Delete a review
router.delete("/:movieId/reviews/:reviewId", async (req, res) => {
    try {
        const { movieId, reviewId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const movie = await Movies.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Find the review
        const review = movie.reviews.id(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if the user owns this review
        if (review.user.toString() !== userId) {
            return res.status(403).json({ 
                message: "You can only delete your own reviews" 
            });
        }

        // Remove the review
        review.deleteOne();

        // Recalculate average rating
        if (movie.reviews.length > 0) {
            const totalRating = movie.reviews.reduce((sum, rev) => sum + rev.rating, 0);
            movie.averageRating = totalRating / movie.reviews.length;
        } else {
            movie.averageRating = 0;
        }

        await movie.save();
        await movie.populate('reviews.user', 'username profileImage');

        res.status(200).json({
            message: "Review deleted successfully",
            movie
        });

    } catch (error) {
        console.log("Error deleting review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
