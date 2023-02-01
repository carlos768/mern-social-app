import { 
  Box, 
  Divider, 
  Typography, 
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery
} from "@mui/material"
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

const CommentWidget = () => {
  const { palette } = useTheme();
  const { _id, picturePath } = useSelector((state) => state.user)
  return (
    <WidgetWrapper>
      <FlexBetween>

      {/* <UserImage image={picturePath} /> */}
      <img src={`${import.meta.env.VITE_BACKEND_URL}/assets/${picturePath}`} alt="user" style={{ objectFit: "cover", borderRadius: "50%", zIndex:"10" }} height={"45px"} width={"45px"} />
      <InputBase 
          placeholder="Add a comment..."
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: ".5rem 2rem",
            right: "25px"
          }}
        />
      <Button
          // disabled={!post}
          // onClick={handlePost}
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