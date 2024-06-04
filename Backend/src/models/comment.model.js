import mongoose, { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        contentID: {
            type: mongoose.Types.ObjectId,
            ref: 'Public',
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Comment = model('Comment', commentSchema);
