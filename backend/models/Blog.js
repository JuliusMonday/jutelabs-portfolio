import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String, // Will store HTML from ReactQuill
      required: true,
    },
    excerpt: {
      type: String,
    },
    coverImage: {
      type: String,
      default: "", // Cloudinary URL
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
