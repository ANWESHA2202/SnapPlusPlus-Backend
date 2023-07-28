import express from 'express';
import { signup, login } from '../controllers/user-controller';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
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
userRouter.post('/login', login)


export default userRouter;