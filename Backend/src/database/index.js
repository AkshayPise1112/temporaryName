import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connected_DB = async () => {
    try {
        const connectedInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log(
            `\nDatabase Connected!!!\n DBHost: ${connectedInstance.connection.host}`
        );
    } catch (error) {
        console.log('Error in Database Connection: ', error);
        process.exit(1);
    }
};

export default connected_DB;
