import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // this user is, we are getting from the cookie
        if (err) return next(errorHandler(403, 'Forbidden'));
        req.user = user;
        next();
    });
};