
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    //Info we get from the browser
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const isEmailPresnet = await User.findOne({email: email})
    const isUserPresnet = await User.findOne({username: username})

    if (isUserPresnet) {
        return res
            .status(410)
            .json({
                message: "Username already exists",
            })
    }
    if (isEmailPresnet) {
        return res
            .status(410)
            .json({
                message: "Email already exists",
            })
    }

    const newUser = new User({ username, email, password: hashedPassword });
    try{
        await newUser.save()
        res.json({ message: 'User created successfully' });
    } catch (error){
        // error message to show on insomnia //with this we can see the error in the insomnia and it doesn't show the error in the console
        // res.status(500).json(error.message);
        next(error);
    }
};

//SignIn Api route making
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler(404, 'User not found')); //yeh check krega ki signin ke time pr joh email daala hai user ne woh correct hai ki nhi.
        const validPassword = bcryptjs.compareSync(password, validUser.password);//yeh password check krega....but we have hashed password in the database so we have to compare the hashed password with the password that user has entered.
        if(!validPassword) return next(errorHandler(400, 'Wrong credentials!'));// agr glt hua.. toh error show krega
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: Pass, ...rest } = validUser._doc;
        res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error){
        next(error);
    }
}
