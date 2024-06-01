import dotenv from 'dotenv';
import connected_DB from './database/index.js';
import { app } from './app.js';

dotenv.config({ path: './env' });

connected_DB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log('MongoDB connection failed...', err);
    });
