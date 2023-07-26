import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRouter from './routes/user-routes.js';

const app = express();
config();
app.use(express.json());
app.use('/api/users', userRouter);

mongoose.connect(`mongodb+srv://anweshasanyal22:${process.env.MONGODB_PASSWORD}@cluster0.wfajdr8.mongodb.net/${process.env.MONGODB_PROJECTNAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    }).then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log(err, 'error');
    });