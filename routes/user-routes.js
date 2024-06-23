import express from "express";
import { config } from "dotenv";
import {
  getUserProfile,
  login,
  refreshToken,
  signOut,
  signup,
  updateProfileEmail,
  updateProfilePassword,
  updateProfilePicture,
  updateProfileUsername,
} from "../controllers/user-controller";
import checkToken from "../Utilities/check-token";

config();

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/myprofile", checkToken, getUserProfile);
userRouter.post(
  "/myprofile/updateprofilepicture",
  checkToken,
  updateProfilePicture
);
userRouter.post(
  "/myprofile/updateprofileusername",
  checkToken,
  updateProfileUsername
);
userRouter.post(
  "/myprofile/updateprofileemail",
  checkToken,
  updateProfileEmail
);
userRouter.post(
  "/myprofile/updateprofilepassword",
  checkToken,
  updateProfilePassword
);

userRouter.post("/refresh-token", checkToken, refreshToken);
userRouter.post("/signout", checkToken, signOut);

export default userRouter;
