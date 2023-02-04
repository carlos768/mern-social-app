import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    firstName:{
      type: String,
      required: true
    },
    lastName:{
      type: String,
      required: true
    },
    commentText: {
      type: String,
      required: true
    },
    userPicturePath: String,
  },
  { timestamps: true }
)

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;