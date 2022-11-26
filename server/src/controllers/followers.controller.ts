import { Response, NextFunction } from "express";
import { UpdateWithAggregationPipeline } from "mongoose";
import Logging from "../logger/logging";
import Followers from "../models/Followers";
import User from "../models/User";
import { UserIdRequest } from "../types/app-request";

/** Follow a Given Person */
const followAUserController = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {
    /* Getting the other userId from the User */
    const { userIdRecipient } = req.body ;

    try { 
        
        // Checking if the UserId Exists or not
        const checkIfTheRecipientUserExistsOrNot : { _id : string } | null = await User.exists({"_id": userIdRecipient});

        if ( !checkIfTheRecipientUserExistsOrNot )
            return res.status(403).json({"success": false, "data": null, "message": "The Recipient UserId does not exists"});
        
        // Check if the current user is already following the recipient User
        const checkIfTheRecipientUserAlreadyExistsInTheCurrentUserFollowing : { _id : string } | null = await Followers.exists({ "userId": req.userDocument.userId, "following" : { $in : [userIdRecipient] }})

        if (checkIfTheRecipientUserAlreadyExistsInTheCurrentUserFollowing)
            return res.status(418).json({"success": false, "data": null, "message": "The user is already following the given user"});    

        // Append the list
        let followerUpdateDocument: any = await Followers.updateOne({ "userId" : req.userDocument.userId }, { $push : { 'following' : userIdRecipient }});
        
        // Check if the document was modified or not
        if ( !followerUpdateDocument.modifiedCount )
            return res.status(418).json({"success": false, "data": null, "message": "No Follower added"});

        return res.status(202).json({"success": true, "data": null, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** See the list of your followings */
const getAllFollowingsOfTheUser = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {
    try {
        // Get all the followers from the users
        const detailsOfTheUser = await Followers.find({ "userId": req.userDocument.userId}).populate('following', 'name username');

        return res.status(200).json({"success": true, "data": detailsOfTheUser, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** Get all the Users in the database */
const getAllUsers = async ( req: UserIdRequest, res: Response, next: NextFunction ): Promise<Response> => {
    try {
        // Get all the followers from the users
        const detailsOfAllTheUser = await User.find({ "_id" : { $ne : req.userDocument.userId } }).select({ "name" : 1, "_id": 1, "username" : 1 })

        return res.status(200).json({"success": true, "data": detailsOfAllTheUser, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

export { followAUserController, getAllFollowingsOfTheUser, getAllUsers };