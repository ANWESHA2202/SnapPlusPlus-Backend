import User from "../models/User";
import Streak from "../models/Streak";
import { generateRandomStreakIcon } from '../Utilities/random-streak-icon';
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

export const createStreak = async(req, res) => {
    const token = req.token;
    const userId = jwt.decode(token).user._id;
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return res.status(400).json([{ message: err.message }]);
    }
    if (!user) {
        return res.status(404).json([{ message: "User Not Found" }])
    }


    const { title, icon } = req.body;
    let streakIcon = icon;
    const titleExist = user.streaks.filter((streak) => streak.title == title);

    if (titleExist.length > 0) {
        return res.status(400).json([{ message: "Streak already exists" }])
    }
    if (icon.length === 0) {
        streakIcon = generateRandomStreakIcon();
    }

    const streak = new Streak({
        title,
        user: user._id,
        count: 0,
        icon: streakIcon
    })

    try {
        const savedStreak = await streak.save();
        user.streaks.push(savedStreak);
        await user.save();

    } catch (err) {
        return res.status(400).json([{ message: err.message }]);
    }
    return res.status(200).json([{ message: 'Streak Created', streak }])

}