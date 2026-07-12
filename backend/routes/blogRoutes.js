import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Blog from "../models/Blog.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "jutelabs_blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({ storage: storage });

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    // Allows finding by ID or slug
    const blog = await Blog.findOne({ $or: [{ slug: req.params.slug }, { _id: req.params.slug.match(/^[0-9a-fA-F]{24}$/) ? req.params.slug : null }] });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", protect, upload.single("coverImage"), async (req, res) => {
  try {
    const { title, content, excerpt } = req.body;
    let imageUrl = req.file ? req.file.path : "";

    let slug = generateSlug(title);
    let existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = new Blog({
      title,
      content,
      excerpt,
      slug,
      coverImage: imageUrl,
    });

    const created = await blog.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog" });
  }
});

router.put("/:id", protect, upload.single("coverImage"), async (req, res) => {
  try {
    const { title, content, excerpt } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      if (title && title !== blog.title) {
        let slug = generateSlug(title);
        let existing = await Blog.findOne({ slug });
        if (existing && existing._id.toString() !== blog._id.toString()) {
          slug = `${slug}-${Date.now()}`;
        }
        blog.slug = slug;
        blog.title = title;
      }

      blog.content = content || blog.content;
      blog.excerpt = excerpt !== undefined ? excerpt : blog.excerpt;
      if (req.file) blog.coverImage = req.file.path;

      const updated = await blog.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.deleteOne();
      res.json({ message: "Blog removed" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

export default router;
