import { 
  Box,  
  InputBase,
  useTheme,
  Button,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setComment } from "../../state";
import { useState } from "react";

const CommentWidget = ({ postId }) => {
  const dispatch = useDispatch()
  const { palette } = useTheme();
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token);
  const [userComment, setUserComment] = useState("")
  const values = {
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    commentText: userComment,
    userPicturePath: user.picturePath
  }

  const postComment = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/${postId}`,{
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
      body: JSON.stringify(values),
    })
    const comment = await response.json()
    dispatch(setComment({comment}))
    setUserComment("");
  }

  return (
    <WidgetWrapper>
      <FlexBetween>
        <img src={`${import.meta.env.VITE_BACKEND_URL}/assets/${user.picturePath}`} alt="user" style={{ objectFit: "cover", borderRadius: "50%", zIndex:"10" }} height={"45px"} width={"45px"} />
        <InputBase 
          placeholder="Add a comment..."
          onChange={(e) => setUserComment(e.target.value)}
          value={userComment}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: ".5rem 2rem",
            right: "25px"
          }}
        />
        <Button
          disabled={!userComment}
          onClick={postComment}
          sx={{
            color: palette.primary.main,
            backgroundColor: palette.background.alt,
            borderRadius: "3rem"
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default CommentWidget;