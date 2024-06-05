import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('static'));
app.use(cookieParser());

//routes
import router from './routes/index.routes.js';

app.use('/api', router);

//http://localhost:8000/api/<name of the route>

export { app };
