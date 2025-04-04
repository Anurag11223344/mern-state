import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
    res.json({
        message: 'Balle Balle',
    });
}

// For update the user credentials in the profle page
export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account')); // if id changed...then this error
        try {
            if(req.body.password) {
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            }, { new: true })

            const { password, ...rest} = updatedUser._doc

            res.status(200).json(rest);

        } catch (error) {
            next(error);
        }
};

// For delete account from the profile page
export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');// After we delete account from profile...we also have to ddelete our cookie.
        res.status(200).json('User has been deleted'); 
    } catch (error) {
        next(error);
    }
}

// For getting the user listings
export const getUserListings = async(req, res, next) => {
    //Real user can see their own listings
    if(req.user.id === req.params.id){
        try {
            const listings = await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    }else{
        return next(errorHandler(401, 'You can only see your own listings'));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'User not found'));
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};