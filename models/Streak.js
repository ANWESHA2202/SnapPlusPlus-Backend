import mongoose from "mongoose";

const Schema = mongoose.Schema;

const streakSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    icon: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
    },
    images: [{
        type: String,
    }],
    notes: [{
        type: String,
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastUpdateDate: {
        type: String,
        required: true
    }

});

export default mongoose.model('Streak', streakSchema);