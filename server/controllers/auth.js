import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import imgbbUploader from "imgbb-uploader"

// REGISTER USER
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(picturePath);
    // Create user with image and upload to imgbb
    if (picturePath != "" && picturePath != undefined){
      const response = await imgbbUploader(process.env.IMGBB_API_KEY, `${process.env.ASSETS_ABSOLUTE_PATH}${picturePath}`)
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath: response.url,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 1000),
        impressions: Math.floor(Math.random() * 1000),
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
      return;
    }

    // Create user without image
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

// LOGGIN IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({token, user})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}