import { Request, Response, NextFunction } from "express";
import Logging from "../logger/logging";
import User, { IUser, IUserModel } from "../models/User";
import { config } from "../config/config";
import { UserIdRequest } from "../types/app-request";
import Post, { IPost, IPostModel } from "../models/Post";

/** Create a Post */
const createPostController = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {
    /* Getting the important details from the User */
    const { content } = req.body ;

    try {        
        // Saving the User Data to the Model
        const postContentDetails = await new Post({
            content,
            userId: req.userDocument.userId
        }).save();
        
        // @ts-ignore
        return res.status(201).json({"success": true, "data": { "postId" : postContentDetails._id}, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** Update a Post */
const updatePostController = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {
    /* Getting the important details from the User */
    const { postId, content } = req.body ;

    try {        
        // Check if a post exists 
        let postUpdateDetails: (IPostModel & { _id: string; }) | null = await Post.findByIdAndUpdate({ _id: postId }, { content });

        // @ts-ignore
        return res.status(201).json({"success": true, "data": { "postId" : postUpdateDetails._id}, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** Delete a Post */
const deletePostController = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {
    /* Getting the important details from the User */
    const { postId } = req.body ;

    try {        
        // Check if a post exists 
        let postDeleteDetails: (IPostModel & { _id: string; }) | null = await Post.findByIdAndDelete(postId);
        
        Logging.info(postDeleteDetails);

        // @ts-ignore
        return res.status(201).json({"success": true, "data": { "postId" : postUpdateDetails._id}, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** Read a Post 
 *  Both from Current Users as well as the Users followed
 * 
 */

export { createPostController, updatePostController, deletePostController };