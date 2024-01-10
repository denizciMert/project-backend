import { NextFunction, Request, Response } from "express";
import User from "../../models/exModelSch.js";

export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      //@ts-ignore
      user.chats = [];
      await user.save();
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };