import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';
import { apiResponse } from '../utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullName, email, password } = req.body;

    if (
        [fullName, username, email, password].some(
            (field) => field?.trim() === ''
        )
    ) {
        throw new apiError(401, 'All fields are required for Registration...');
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        throw new apiError(
            409,
            'User with same username and email already Register...'
        );
    }

    // console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
        throw new apiError(409, 'avatar File is required...');
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new apiError(400, 'avatar is required...');
        // fs.unlink(avatarLocalPath);
    }

    const user = await User.create({
        fullName,
        profile: avatar?.url,
        email,
        password,
        username: username.toLowerCase(),
    });

    const chk_user = await User.findById(user._id).select(
        '-password -refreshToken'
    );

    if (!chk_user) {
        throw new apiError(501, 'Error in Registering User');
    }

    return res
        .status(201)
        .json(
            new apiResponse(201, chk_user, 'user Registered successfully...')
        );
});

export { registerUser };
