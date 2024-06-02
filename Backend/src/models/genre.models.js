import mongoose, { Schema } from 'mongoose';

const genreSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        publicID: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Public',
            },
        ],
        draftID: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Draft',
            },
        ],
        privateID: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Private',
            },
        ],
    },
    { timestamps: true }
);
