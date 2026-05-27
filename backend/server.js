import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// contactRoutes removed: contact handling moved to FormSubmit (frontend-only)

dotenv.config();

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Routes
// Note: message handling has been moved to FormSubmit.co via the frontend.
// If you need to re-enable a custom backend handler later, restore the import
// above and uncomment the middleware registration below.
// app.use("/api/contact", contactRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Portfolio backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
