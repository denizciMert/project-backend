import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../constants.js";


export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
      return res.status(401).json({ message: "Token Not Received" });
    }
    return new Promise<void>((resolve, reject) => {
      return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
          reject(err.message);
          return res.status(401).json({ message: "Token Expired" });
        } else {
          resolve();
          res.locals.jwtData = success;
          return next();
        }
      });
    });
  };