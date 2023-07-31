import mongoose from "mongoose";
import User from "../models/User";
import Streak from "../models/Streak";
import { generateRandomStreakIcon } from '../Utilities/random-streak-icon';
import { daysBetweenDates, getFormattedCurrentDate } from "../Utilities/date";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();


export const getAllStreaksOfAUser = async(req, res) => {
    const token = req.token;
    const userId = jwt.decode(token).user._id;

    let user, streaks;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }

    if (!user) {
        return res.status(404).json([{ message: "User Not Found" }])
    }

    try {
        streaks = await Streak.find({
            user: userId
        })
    } catch (err) {
        return res.status(400).json([{ message: err.message }])

    }
    if (streaks.length === 0) {
        return res.status(404).json([{ message: "No Streaks Found" }])
    }
    return res.status(200).json([{ message: 'Streaks Found', streaks }])
}

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
    let titleExist;
    try {
        titleExist = await Streak.find({
            title: title,
            user: userId
        })
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }
    if (titleExist.length > 0) {
        return res.status(400).json([{ message: "Streak already exists" }])
    }
    if (icon.length === 0) {
        streakIcon = generateRandomStreakIcon();
    }

    const streak = new Streak({
        title,
        count: 0,
        user: userId,
        icon: streakIcon,
        lastUpdateDate: getFormattedCurrentDate()
    })

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await streak.save({ session });
        user.streaks.push(streak);
        await user.save({ session })
        await session.commitTransaction();

    } catch (err) {
        return res.status(400).json([{ message: err.message }]);
    }
    return res.status(200).json([{ message: 'Streak Created', streak }])

}


export const updateStreak = async(req, res) => {
    const { title, note, image } = req.body;
    const token = req.token;
    const userId = jwt.decode(token).user._id;

    let user, streak;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }
    if (!user) {
        return res.status(404).json([{ message: "User Not Found" }])
    }
    try {
        streak = await Streak.findOne({
            title: title,
            user: userId
        });
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }
    if (!streak) {
        return res.status(404).json([{ message: "Streak Is Not Created Yet" }])
    }


    let currentDate = getFormattedCurrentDate();
    let lastUpdateDate = streak.lastUpdateDate;
    let daysDiff = daysBetweenDates(lastUpdateDate, currentDate);

    if (daysDiff == 1) {
        try {
            streak.count += 1;
            if (note) streak.notes.push(note);
            if (image) streak.images.push(image);
            streak.lastUpdateDate = currentDate;
            await streak.save();
        } catch (err) {
            return res.status(400).json([{ message: err.message }])
        }
    } else {
        try {
            if (note) streak.notes.push(note);
            if (image) streak.images.push(image);
            await streak.save();
        } catch (err) {
            return res.status(400).json([{ message: err.message }])
        }
    }

    return res.status(200).json([{ message: 'Streak Updated', streak }])

}

export const updateStreakTitle = async(req, res) => {
    const { title, newTitle } = req.body;
    const token = req.token;
    const userId = jwt.decode(token).user._id;

    let streak;
    try {
        streak = await Streak.findOne({
            title: title,
            user: userId
        })
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }

    if (!streak) {
        return res.status(404).json([{ message: "Streak Not Found" }])
    }

    if (title === newTitle) {
        return res.status(400).json([{ message: "New Title is same as old title" }])
    }
    try {
        streak.title = newTitle;
        await streak.save();
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }
    return res.status(200).json([{ message: 'Streak Title Updated', streak }])
}

export const updateStreakIcon = async(req, res) => {
    const { title, icon } = req.body;
    const token = req.token;
    const userId = jwt.decode(token).user._id;

    let streak;
    try {
        streak = await Streak.findOne({
            title: title,
            user: userId
        })
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }

    if (!streak) {
        return res.status(404).json([{ message: "Streak Not Found" }])
    }


    try {
        if (icon.length === 0) {
            streak.icon = generateRandomStreakIcon();
        } else {
            streak.icon = icon;
        }
        await streak.save();
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }
    return res.status(200).json([{ message: 'Streak Icon Updated', streak }])

}


export const deleteStreak = async(req, res) => {
    const { title } = req.body;
    const token = req.token;
    const userId = jwt.decode(token).user._id;

    let streak;
    try {
        streak = await Streak.findOne({
            title: title,
            user: userId
        })
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }

    if (!streak) {
        return res.status(404).json([{ message: "Streak Not Found" }])
    }
    try {
        await Streak.deleteOne({
            title: title,
            user: userId
        })
    } catch (err) {
        return res.status(400).json([{ message: err.message }])
    }
    return res.status(200).json([{ message: 'Streak Deleted' }])
}