import { Router } from "express";
import { validate } from "../utils/validators/validator.js";
import { signUpValidator } from "../utils/validators/signUpVal.js";
import { loginValidator } from "../utils/validators/loginVal.js";
import { getAllUsers } from "../controllers/userController/allUsers.js";
import { verifyToken } from "../utils/tokenMgr/verifyToken.js";
import { userLogout } from "../controllers/userController/userLogout.js";
import { userLogin } from "../controllers/userController/userLogin.js";
import { userSignup } from "../controllers/userController/userSignUp.js";
import { verifyUser } from "../controllers/userController/userVerify.js";

const userRoutes = Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup", validate(signUpValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;