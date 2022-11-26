import { Response, NextFunction } from "express";
import Logging from "../logger/logging";
import { UserIdRequest } from "../types/app-request";
import Post, { IPostModel } from "../models/Post";
import Followers from "../models/Followers";

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

        return res.status(204).json({"success": true, "data": { "postId" : postUpdateDetails?._id}, "message": null});
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

        return res.status(200).json({"success": true, "data": { "postId" : postDeleteDetails?._id}, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** Get all posts by a user */
const getAllPostsByAUser = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {
    
    try {
        let allPostsOfTheParticularUser = await Post.find({ "userId" : req.userDocument.userId });
        return res.status(200).json({"success": true, "data": { allPostsOfTheParticularUser }, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** Get a specific post */
const getAParticularPost = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {
    
    const { postId } = req.query ;
    
    try {
        let particularPostRequestByTheUser = await Post.findById(postId);
        return res.status(201).json({"success": true, "data": { particularPostRequestByTheUser }, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

/** Read a Post 
 *  Both from Current Users as well as the Users followed
 */
const getPostsFromAllTheFollowings = async ( req: UserIdRequest, res: Response, next: NextFunction ) : Promise <Response> => {

    const { postId } = req.query ;
    
    try {
        /** 
         * Populate the Following of the User 
         * Search up for their posts 
         * Output the result 
         */

        const getAllFollowingsOfTheUser = (await Followers.findOne({"userId": req.userDocument.userId}).populate('following', '_id username name'))!;
        
        let finalArrayOfUsers = [];
        for ( let followers of getAllFollowingsOfTheUser!.following ){
            // Lookup for the posts by the given user 
            // @ts-ignore
            const postFromTheCurrentIterativeUser = await Post.find({ "userId" : followers._id }).select({ "content" : 1, "_id": 0 })
            
            // Creating the sample response
            let templateForStoringResponse = {
                name: followers.name,
                username: followers?.username,
                posts: postFromTheCurrentIterativeUser
            }

            // Pushing the aggregate
            finalArrayOfUsers.push(templateForStoringResponse);
        }
        
        return res.status(200).json({"success": true, "data": finalArrayOfUsers, "message": null});
    } catch ( err: any ){
        Logging.error(err.message);
        return res.status(500).json({"success": false, "data": null, "message": "Something went wrong"});
    }
}

export { createPostController, updatePostController, deletePostController, getAllPostsByAUser, getAParticularPost, getPostsFromAllTheFollowings };