import { Request, Response, NextFunction } from "express";
import Logging from "../logger/logging";
import User, { IUser, IUserModel } from "../models/User";
import { hash } from 'bcryptjs'

const createUserController = async ( req: Request, res: Response, next: NextFunction ) : Promise <Response> => {
    
    /* Getting the important details from the User */    
    const { name, email, password, username } = req.body ;

    try {        
        // Validating Username
        const usernameValidation : { _id : string } | null = await User.exists({ username });

        if ( usernameValidation ){
            return res.status(403).json({"success": false, "data": null, "message": "Username already exists"});
        }
        
        // Validating Email
        const emailValidation : { _id : string } | null = await User.exists({ email });
        
        if ( emailValidation ){
            return res.status(403).json({"success": false, "data": null, "message": "Email already exists"});
        }

        // Generating the hash of the password 
        const hashedPassword : string = await hash( password, 10 );

        // Saving the User Data to the Model
        await new User({
            name,
            password: hashedPassword,
            username,
            email
        }).save();
        
        return res.status(201).json({"success": true, "data": null, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

export { createUserController }