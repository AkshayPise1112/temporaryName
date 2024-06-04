import mongoose, { Schema, model } from 'mongoose';

const draftSchema = new Schema(
    {
        name: {
            type: String,
        },
        coverImage: {
            type: String,
        },
        description: {
            type: String,
        },
        content: {
            type: String,
        },
        genres: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Genre',
            },
        ],
    },
    { timestamps: true }
);

export const Draft = model('Draft', draftSchema);
