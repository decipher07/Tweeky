import { Response, Request, NextFunction } from "express";
import { getGoogleAuthURL, oauth2Client } from '../auth/utils'
import { google } from 'googleapis';
import Logging from "../logger/logging";
import User, { IUser, IUserModel } from "../models/User";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import Followers from "../models/Followers";

/* Server redirection to different website */
const getGoogleAuthURLController = (req: Request, res: Response) => {
    return res.redirect(getGoogleAuthURL());
}

/*  Redirect Google Controller 
    This gets hit after the oauth is performed from OAuth
*/
const redirectGoogleAuthController = async (req: Request, res: Response) => {
    const code = req.query.code as string;

    try {
        /* Get the tokens credentials to be added for OAuth */
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.credentials = tokens;

        /* Google SDK for Google Plus Integration */
        let googleOAuthInfoRedirect = google.oauth2({ version: 'v2', auth: oauth2Client })

        /* Getting the Google User Information */
        const googleUserInfo: any = await googleOAuthInfoRedirect.userinfo.get();
        const { name, email } = googleUserInfo.data;

        // Validating Email exists or not
        const emailValidationForPreviousExistingEntries: { _id: string } | null = await User.exists({ email });

        if (emailValidationForPreviousExistingEntries) {
            const userDocument : IUser = (await User.findOne({ email }))!;
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
                
            return res.status(200).json({ "success": true, "data": { token }, "message": null });
        }

        // Saving the User Data to the Model
        const userDocument = await new User({
            name,
            email
        }).save();

        // Save the Following Models
        await new Followers({
            "userId": userDocument?._id,
            following: []
        }).save();

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

        return res.status(201).json({ "success": true, "data": { token }, "message": null });
        
    } catch (err: any) {
        Logging.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Error in redirecting" });
    }
}

export { getGoogleAuthURLController, redirectGoogleAuthController };