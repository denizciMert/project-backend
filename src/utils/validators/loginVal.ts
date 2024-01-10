import { body } from "express-validator";

export const loginValidator =[
    body("email").notEmpty().withMessage("Email is required."),
    body("password").notEmpty().withMessage("Password is required."),
    body("email").trim().isEmail().withMessage("Invalid email."),
    body("password").trim().isLength({min:8}).withMessage("Invalid password. Minimum 8 characters required.")
]