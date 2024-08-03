import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (confirmPassword !== password) {
      return res.status(400).json({
        status: "fail",
        message: "Passwords do not match"
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    if(newUser){
      generateToken(newUser._id, res);
    }
    
    res.status(201).json({
      status: "success",
      data: newUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid username or password",
      });
    }

    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid username or password",
      });
    }
    
    const token = generateToken(user._id, res);

    res.status(200).json({
      status: "success",
      token, // Ensure the token is included in the response
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const me = (req,res)=>{

  const user = req.user;
  res.status(200).json({
    status:"success",
    data:user
  });

};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    status: "success",
    message: "Logged out successfully"
  });
};
