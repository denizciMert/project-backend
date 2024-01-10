import { body } from "express-validator";

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message  is required"),
  ];