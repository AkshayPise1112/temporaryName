import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { apiResponse } from '../utils/apiResponse.js';

async function generateAccessAndRefreshTokens(userID) {
    try {
        const user = await User.findById(userID);

        const refreshToken = await user.generateAccessToken();
        const accessToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(
            501,
            'Error while generating refresh and access token...'
        );
    }
}

async function uploadProfilePhoto(profileLocalPath) {
    if (!profileLocalPath) {
        throw new apiError(409, 'Profile File is required...');
    }

    const profile = await uploadOnCloudinary(profileLocalPath, true);

    if (!profile) {
        throw new apiError(400, 'profile is required...');
    }

    return profile?.url;
}

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
    console.log('profileLocalPath');

    let profileLocalPath = null;

    if (
        req.files &&
        Array.isArray(req.files.profile) &&
        req.files.profile.length > 0
    ) {
        profileLocalPath = req.files?.profile[0]?.path;
    }

    // console.log(await uploadProfilePhoto(profileLocalPath));

    const profile = profileLocalPath
        ? await uploadProfilePhoto(profileLocalPath)
        : 'https://res.cloudinary.com/akshaypise1112/image/upload/v1718261513/Profile%20Photos/n0umoxcel3umz6mbvqyv.png';

    const user = await User.create({
        fullName,
        profile,
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

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new apiError(401, 'Username or Email Required for login...');
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        throw new apiError(501, 'User Does not exist...');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new apiError(401, 'invalid user Password...');
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        '-password -refreshToken'
    );

    const options = {
        httpOnly: true,
        secure: true,
        // sameSite: 'strict',
    };

    return res
        .status(201)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new apiResponse(
                201,
                { user: loggedInUser, accessToken, refreshToken },
                'user logged in successfully...'
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
        // sameSite: 'strict',
    };

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new apiResponse(201, {}, 'User LoggedOut Successfully...'));
});

export { registerUser, loginUser, logoutUser };
