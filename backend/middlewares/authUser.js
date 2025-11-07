import express from "express";
import jwt from "jsonwebtoken";

// --- API for user Authorization ---
const authUser = async (req, res, next) => {
  try {

    const {token} = req.headers;

    if(!token) {
      return res.json({
        success: false,
        message: "User does not authorized!"
      });
    }

    const token_decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;
    next();
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export default authUser;