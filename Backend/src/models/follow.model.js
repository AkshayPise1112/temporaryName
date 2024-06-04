import mongoose, { Schema, model } from 'mongoose';

const followSchema = new Schema(
    {
        page: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

export const Follow = model('Follow', followSchema);
