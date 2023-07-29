import express from 'express';
import { signup, login, getUserProfile, updateProfilePicture, updateProfileUsername } from '../controllers/user-controller';
import { config } from 'dotenv';

config();

const userRouter = express.Router();


function checkToken(req, res, next) {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/myprofile', checkToken, getUserProfile);
userRouter.post('/myprofile/updateprofilepicture', checkToken, updateProfilePicture);
userRouter.post('/myprofile/updateprofileusername', checkToken, updateProfileUsername);


export default userRouter;