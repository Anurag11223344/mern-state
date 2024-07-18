import express from 'express';
import mongoose from 'mongoose';

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

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
});