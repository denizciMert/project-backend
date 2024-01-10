import { NextFunction, Request, Response } from "express";
import User from "../../models/exModelSch.js";
import { COOKIE_NAME } from "../../utils/constants.js";

export const userLogout = async (
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
  
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
  
      return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };