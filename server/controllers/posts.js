import Post from "../models/Post.js";
import User from "../models/User.js";
import imgbbUploader from "imgbb-uploader"
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    console.log(picturePath);
    
    const user = await User.findById(userId);
    if (picturePath != undefined) {
      const response = await imgbbUploader(process.env.IMGBB_API_KEY, `${process.env.ASSETS_ABSOLUTE_PATH}${picturePath}`)
      
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath: response.url || null,
        likes: {},
        comments: []
      });

      await newPost.save();
      const post = await Post.find().sort('-createdAt');
      res.status(201).json(post);
      return;
    }
    
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    });
    await newPost.save();

    const post = await Post.find().sort('-createdAt');
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort('-createdAt');
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// UPDATE
export const likePost = async(req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}