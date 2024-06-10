import mongoose, { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            required: true,
        },
        about: {
            type: String,
        },
        drafts: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Draft',
            },
        ],
        public: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Public',
            },
        ],
        private: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Private',
            },
        ],
        followers: {
            type: Number,
            default: 0,
        },
        following: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Follow',
            },
        ],
        saved: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Public',
            },
        ],
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = model('User', userSchema);
