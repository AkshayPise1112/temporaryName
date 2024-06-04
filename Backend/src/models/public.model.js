import mongoose, { Schema, model } from 'mongoose';

const publicSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        genres: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Genre',
            },
        ],
    },
    { timestamps: true }
);

export const Public = model('Public', publicSchema);
