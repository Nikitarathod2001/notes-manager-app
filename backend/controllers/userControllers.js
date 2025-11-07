import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// --- API for user registration ---
const userRegister = async (req, res) => {
  try {

    const {name, email, password} = req.body;

    if(!name || !email || !password) {
      return res.json({
        success: false,
        message: "Data Missing"
      });
    }

    if(!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email"
      });
    }

    const userData = await userModel.findOne({email});
    if(userData) {
      return res.json({
        success: false,
        message: "User exists with this email id"
      });
    }

    if(password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new userModel({name, email, password: hashedPass});
    const user = await newUser.save();

    const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "Registration Successful!",
      token
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// --- API for user login ---
const userLogin = async (req, res) => {
  try {

    const {email, password} = req.body;

    if(!email || !password) {
      return res.json({
        success: false,
        message: "Data Missing"
      });
    }

    const userData = await userModel.findOne({email});
    if(!userData) {
      return res.json({
        success: false,
        message: "User does not exist"
      });
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if(!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    const token = await jwt.sign({id: userData._id}, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "Logged In Successful!",
      token
    });

    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// --- API to get user data ---
const getUserData = async (req, res) => {
  try {

    const userId = req.userId;

    const userData = await userModel.findById(userId).select("-password");

    res.json({
      success: true,
      userData
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export {userRegister, userLogin, getUserData};