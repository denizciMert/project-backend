import { NextFunction, Request, Response } from "express";
import User from "../../models/exModelSch.js";
import { compare } from "bcrypt";
import { COOKIE_NAME } from "../../utils/constants.js";
import { createToken } from "../../utils/tokenMgr/createToken.js";

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user login
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send("User not registered");
      }
      const isPasswordCorrect = await compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(403).send("Incorrect Password");
      }
  
      // create token and store cookie
  
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
  
      const token = createToken(user._id.toString(), user.email, "7d");
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
      });
  
      return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };