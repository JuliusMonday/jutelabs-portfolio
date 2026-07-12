import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Testimonial from "../models/Testimonial.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "jutelabs_testimonials",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { clientName, company, review, rating } = req.body;
    let imageUrl = req.file ? req.file.path : "";

    const testimonial = new Testimonial({
      clientName,
      company,
      review,
      rating: rating || 5,
      image: imageUrl,
    });

    const created = await testimonial.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Failed to create testimonial" });
  }
});

router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const { clientName, company, review, rating } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      testimonial.clientName = clientName || testimonial.clientName;
      testimonial.company = company || testimonial.company;
      testimonial.review = review || testimonial.review;
      testimonial.rating = rating || testimonial.rating;
      if (req.file) testimonial.image = req.file.path;

      const updated = await testimonial.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: "Testimonial not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update testimonial" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await testimonial.deleteOne();
      res.json({ message: "Testimonial removed" });
    } else {
      res.status(404).json({ message: "Testimonial not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete testimonial" });
  }
});

export default router;
