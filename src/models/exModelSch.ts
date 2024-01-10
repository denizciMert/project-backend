import mongoose from "mongoose";
import { userSchema } from "./userSch.js";

const User = mongoose.model("User", userSchema);
export default User;