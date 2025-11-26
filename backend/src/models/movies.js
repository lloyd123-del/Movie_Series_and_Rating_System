import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  genre: {
    type: [String],
    required: true
  },
 
  releaseYear: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    trim: true
  },

  duration: {
    type: String, 
  },

  director: {
    type: String,
    trim: true
  },

  //posterImage: {
 //   type: String,
 //   required: true
 // },


  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
      },
      comment: {
        type: String,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],


  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true});

export default mongoose.model("movies", moviesSchema);
