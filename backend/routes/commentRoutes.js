import express from 'express';
import Comment from '../models/Comment.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/comments
// @desc    Add a comment to a blog post
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { blogId, name, email, content } = req.body;
    
    if (!blogId || !name || !email || !content) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const comment = new Comment({
      blogId,
      name,
      email,
      content,
    });

    const createdComment = await comment.save();
    res.status(201).json(createdComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error saving comment', error: error.message });
  }
});

// @route   GET /api/comments/blog/:blogId
// @desc    Get all comments for a specific blog post
// @access  Public
router.get('/blog/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching comments', error: error.message });
  }
});

// @route   GET /api/comments
// @desc    Get all comments (Admin)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // Populate blogId to get the blog title
    const comments = await Comment.find().populate('blogId', 'title').sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching all comments', error: error.message });
  }
});

// @route   DELETE /api/comments/:id
// @desc    Delete a comment (Admin)
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    await comment.deleteOne();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting comment', error: error.message });
  }
});

export default router;
