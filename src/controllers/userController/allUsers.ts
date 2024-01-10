import { NextFunction, Request, Response } from "express";
import User from "../../models/exModelSch.js";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //get all users
      const users = await User.find();
      return res.status(200).json({ message: "OK", users });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };