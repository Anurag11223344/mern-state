import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const username = 'Anurag';
const password = encodeURIComponent('Anurag@123'); // Encode the password
const cluster = 'mern-estate.9d7kpch.mongodb.net';
const dbname = 'mern-estate';

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
const app = express();

app.use(express.json());

app.use(cookieParser());



app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
});

//user request krega aur server response krega.
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter); //For Creating new api route. now create listing.route.js.


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});