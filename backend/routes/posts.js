const express = require("express");
const Post = require("../models/Post");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//Get all the posts
//Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all the posts
router.get("/my-posts", protect, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get single post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Add new post
router.post("/new-post", protect, async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Please provide all the contents" });
  }

  //check if logged in
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const post = await Post.create({
      author: req.user.id,
      title,
      content,
      image,
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Edit post
router.put("/edit/:id", protect, async (req, res) => {
  const id = req.params.id;

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  //check if logged in
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  //check if user is same as the post user
  if (post.author.toString() !== req.user.id) {
    return res.status(404).json({ message: "User not authorized" });
  }

  try {
    const updatedPost = await Post.findOneAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete Post
router.delete("/delete/:id", protect, async (req, res) => {
  const id = req.params.id;

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  //check if logged in
  if (!req.user) {
    return res.status(404).json({ message: "Please login and try again" });
  }

  //check if user is same as the post user
  if (post.author.toString() !== req.user.id) {
    return res.status(404).json({ message: "User not authorized" });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    res.status(200).json({ id: deletedPost._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//comment route
router.post("/:id/comment", protect, async (req, res) => {
  //get the post
  const id = req.params.id;
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (!req.user) {
    return res.status(404).json({ message: "Please login to comment" });
  }

  try {
    const newComment = {
      author: req.user.id,
      content: req.body.content,
    };

    const updated = await Post.findOneAndUpdate(
      { id },
      {
        $push: {
          comment: newComment,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//comment route
router.post("/:id/:commentID/delete", protect, async (req, res) => {
  //get the post
  const { id, commentID } = req.params;
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  //check if comment exist
  if (post.comment.some((e) => e._id !== req.params.commentID)) {
    return res.status(404).json({ message: "Comment doesnt exist" });
  }

  if (!req.user) {
    return res.status(404).json({ message: "Please login and try again" });
  }

  try {
    const updated = await Post.findOneAndUpdate(
      { id },
      {
        $pull: {
          comment: { _id: commentID },
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
