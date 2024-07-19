import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

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

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
});

//user request krega aur server response krega.
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


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