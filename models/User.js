import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    streaks: [{
        type: Schema.Types.ObjectId,
        ref: 'Streak'
    }]
});

export default mongoose.model('User', userSchema);