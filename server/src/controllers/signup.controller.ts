import { Request, Response, NextFunction } from "express";
import Logging from "../logger/logging";
import User, { IUser, IUserModel } from "../models/User";
import { hash, compare } from 'bcryptjs'
import { UserIdRequest } from "../types/app-request";
import jwt from 'jsonwebtoken';
import { config } from "../config/config";

/** Signing up User */
const createUserController = async ( req: Request, res: Response, next: NextFunction ) : Promise <Response> => {
    
    /* Getting the important details from the User */    
    const { name, email, password, username } = req.body ;

    try {        
        // Validating Username exists or not
        const usernameValidationForPreviousExistingEntries : { _id : string } | null = await User.exists({ username });

        if ( usernameValidationForPreviousExistingEntries ){
            return res.status(403).json({"success": false, "data": null, "message": "Username already exists"});
        }
        
        // Validating Email exists or not
        const emailValidationForPreviousExistingEntries : { _id : string } | null = await User.exists({ email });
        
        if ( emailValidationForPreviousExistingEntries ){
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

/** Updating Username */
const updateUserNameController = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {
    
    /* Getting the important details from the User */    
    const { username } = req.body ;

    try {        
        // Validating Username exists or not
        const usernameValidationForPreviousExistingEntries : { _id : string } | null = await User.exists({ username });

        if ( usernameValidationForPreviousExistingEntries ){
            return res.status(403).json({"success": false, "data": null, "message": "Username already exists"});
        }
        
        await User.updateOne({ "_id" : req.userDocument.userId as any }, { $set: { username }})
        
        return res.status(201).json({"success": true, "data": null, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** Updating Password */
const updatePasswordController = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {
    
    /* Getting the important details from the User */    
    const { password } = req.body ;

    try {        
        // Validating Username exists or not
        const usernameValidationForPreviousExistingEntries : { _id : string } | null = await User.exists({ "_id": req.userDocument.userId });

        if ( !usernameValidationForPreviousExistingEntries ){
            return res.status(403).json({"success": false, "data": null, "message": "UserId does not exists"});
        }
        
        // Generating the hash of the password 
        const hashedPassword : string = await hash( password, 10 );

        await User.updateOne({ "_id" : req.userDocument.userId }, { $set: { password: hashedPassword }})
        
        return res.status(201).json({"success": true, "data": null, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** Login Controller */
const loginController = async ( req: Request, res: Response, next: NextFunction ): Promise <Response> => {
    
    /* Getting the important details from the User */    
    const { email, password } = req.body ;

    try {
        // Validating Email exists or not
        const emailValidationForPreviousExistingEntries : { _id : string } | null = await User.exists({ email });
        
        if ( !emailValidationForPreviousExistingEntries ){
            return res.status(403).json({"success": false, "data": null, "message": "No Email already exists"});
        }

        // Finding the document
        const userDocument: IUser = (await User.findOne({ email }))!;

        // Comparing the hash of the password 
        if (!await compare ( password, userDocument.password as string ))
            return res.status(403).json({"success": false, "data": null, "message": "Incorrect password"});
        
        const token = jwt.sign(
            {
                // @ts-ignore
                userId: userDocument?._id,
                email: userDocument.email
            },
            config.jwt.secret,
            {
                expiresIn: "30d"
            }
        )

        return res.status(200).json({"success": true, "data": { token }, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

export { createUserController, updateUserNameController, updatePasswordController, loginController }