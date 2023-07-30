import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRouter from './routes/user-routes.js';
import streakRouter from './routes/streak-routes.js';

const app = express();
config();
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/users/streaks', streakRouter);

mongoose.connect(`mongodb+srv://anweshasanyal22:${process.env.MONGODB_PASSWORD}@cluster0.wfajdr8.mongodb.net/${process.env.MONGODB_PROJECTNAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    }).then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log(err, 'error');
    });