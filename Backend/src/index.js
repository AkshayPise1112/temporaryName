import dotenv from 'dotenv';
import connected_DB from './database/index.js';

dotenv.config({ path: './env' });

connected_DB();
