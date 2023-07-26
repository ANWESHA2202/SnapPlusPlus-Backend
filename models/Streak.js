import mongoose from "mongoose";

const Schema = mongoose.Schema;

const streakSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
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
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

});

export default mongoose.model('Streak', streakSchema);