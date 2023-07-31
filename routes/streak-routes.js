import express from 'express';
import { config } from 'dotenv';
import checkToken from '../Utilities/check-token';
import { getAllStreaksOfAUser, createStreak, updateStreak, updateStreakTitle, updateStreakIcon } from '../controllers/streak-controller';
config();

const streakRouter = express.Router();

streakRouter.get('/getallstreaksofauser', checkToken, getAllStreaksOfAUser);
streakRouter.post('/createstreak', checkToken, createStreak);
streakRouter.post('/updatestreak', checkToken, updateStreak);
streakRouter.post('/updatestreaktitle', checkToken, updateStreakTitle);
streakRouter.post('/updatestreakicon', checkToken, updateStreakIcon);



export default streakRouter;