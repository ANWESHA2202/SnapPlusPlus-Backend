import express from 'express';
import { config } from 'dotenv';
import checkToken from '../Utilities/check-token';
import { createStreak } from '../controllers/streak-controller';
config();

const streakRouter = express.Router();

streakRouter.post('/createstreak', checkToken, createStreak);



export default streakRouter;