import { Router } from "express";
import { validate } from "../utils/validators/validator.js";
import { chatCompletionValidator } from "../utils/validators/chatVal.js";
import { verifyToken } from "../utils/tokenMgr/verifyToken.js";
import { generateChatCompletion } from "../controllers/chatController/generateChat.js";
import { sendChatsToUser } from "../controllers/chatController/send2userChat.js";
import { deleteChats } from "../controllers/chatController/deleteChat.js";

const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;