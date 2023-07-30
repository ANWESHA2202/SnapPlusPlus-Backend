import express from 'express';
import { config } from 'dotenv';
import checkToken from '../Utilities/check-token';
import { signup, login, getUserProfile, updateProfilePicture, updateProfileUsername, updateProfileEmail, updateProfilePassword, signOut } from '../controllers/user-controller';

config();

const userRouter = express.Router();




userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/myprofile', checkToken, getUserProfile);
userRouter.post('/myprofile/updateprofilepicture', checkToken, updateProfilePicture);
userRouter.post('/myprofile/updateprofileusername', checkToken, updateProfileUsername);
userRouter.post('/myprofile/updateprofileemail', checkToken, updateProfileEmail);
userRouter.post('/myprofile/updateprofilepassword', checkToken, updateProfilePassword);
userRouter.post('/signout', checkToken, signOut);

export default userRouter;