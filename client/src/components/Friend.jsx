import { useState } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [isFetching, setIsFetching] = useState(false);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium
  
  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    setIsFetching(true);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/${_id}/${friendId}`,
      {
      method: "PATCH",
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }  
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data}))
    setIsFetching(false);
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px"/>
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0); // simple (not optimal) solution to components not re-render when click on a user's profile from a friend's profile
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer"
              }
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {_id === friendId ? (
        <></>
      ) : (
        <IconButton
        disabled={isFetching} 
        onClick={() => patchFriend()}
        sx={{ 
          backgroundColor: primaryLight, 
          p:"0.6rem"
        }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
      )}
      
    </FlexBetween>
  )
}

export default Friend;