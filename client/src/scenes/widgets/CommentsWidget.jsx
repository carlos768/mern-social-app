import { 
  Box, 
  Typography, 
  useTheme,
} from "@mui/material";

const CommentsWidget = ({ userPicturePath, firstName, lastName, commentText }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  return (
    <Box display="flex" alignItems="center" gap=".5rem" my=".5rem">
      <img src={userPicturePath} alt="user" style={{ objectFit: "cover", borderRadius: "50%", zIndex:"10" }} height={"25px"} width={"25px"}/>
      <Typography color={main} fontWeight="500">{firstName} {lastName}:</Typography>
      <Typography>{commentText}</Typography>
    </Box>
  )
}

export default CommentsWidget