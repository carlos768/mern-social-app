import express from "express";
import { getComments, getPostComments, createComment } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getComments)
router.get("/:postId/comments", verifyToken, getPostComments);

//CREATE
router.post("/:postId", verifyToken, createComment)

export default router;