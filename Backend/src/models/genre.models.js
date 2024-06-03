import mongoose, { Schema, model } from 'mongoose';

const genreSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        publics: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Public',
            },
        ],
        drafts: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Draft',
            },
        ],
        privates: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Private',
            },
        ],
    },
    { timestamps: true }
);

export const Genre = model('Genre', genreSchema);
