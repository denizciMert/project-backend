import { body } from "express-validator";
import { loginValidator } from "./loginVal.js";

export const signUpValidator =[
    body("name").notEmpty().withMessage("Name is required."),
    ...loginValidator,
]