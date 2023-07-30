import express from 'express';
import { config } from 'dotenv';
import checkToken from '../Utilities/check-token';
import { createStreak, updateStreak } from '../controllers/streak-controller';
config();

const streakRouter = express.Router();

streakRouter.post('/createstreak', checkToken, createStreak);
streakRouter.post('/updatestreak', checkToken, updateStreak);



export default streakRouter;