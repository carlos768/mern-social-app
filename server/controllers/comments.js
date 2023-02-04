import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// READ
export const getComments = async (req, res) => {
  try {
    const comment = await Comment.find()
    res.status(201).json(comment)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const comments = post.comments
    res.status(201).json(comments);
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// CREATE
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, commentText } = req.body;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    console.log(user);
    console.log(postId);
    const newComment = new Comment({
      userId,
      postId,
      firstName: user.firstName,
      lastName: user.lastName,
      commentText,
      userPicturePath: user.picturePath
    });
    post.comments.push(newComment)
    await post.save();
    await newComment.save();

    const comment = await Comment.find().sort('-createdAt');
    res.status(201).json(comment);
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}