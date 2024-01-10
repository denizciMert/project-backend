import { NextFunction, Request, Response } from "express";
import User from "../../models/exModelSch.js";
import { hash } from "bcrypt";
import { COOKIE_NAME } from "../../utils/constants.js";
import { createToken } from "../../utils/tokenMgr/createToken.js";

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user signup
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(401).send("User already registered");
      const hashedPassword = await hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
  
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
        .status(201)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };