import { Response, Request, NextFunction } from "express";
import { getGoogleAuthURL, oauth2Client } from '../auth/utils'
import { google } from 'googleapis';
import Logging from "../logger/logging";
import User, { IUser, IUserModel } from "../models/User";

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
            return res.status(200).json({ "success": true, "data": null, "message": null });
        }

        // Saving the User Data to the Model
        await new User({
            name,
            email
        }).save();

        return res.status(200).json({ "success": true, "data": null, "message": null });
        
    } catch (err: any) {
        Logging.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Error in redirecting" });
    }
}

export { getGoogleAuthURLController, redirectGoogleAuthController };