import { log } from "mathjs";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    //Info we get from the browser
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try{
        await newUser.save()
        res.json({ message: 'User created successfully' });
    } catch (error){
        // error message to show on insomnia //with this we can see the error in the insomnia and it doesn't show the error in the console
        res.status(500).json(error.message);
    }
    
    
};
