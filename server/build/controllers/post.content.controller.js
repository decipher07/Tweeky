"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsFromAllTheFollowings = exports.getAParticularPost = exports.getAllPostsByAUser = exports.deletePostController = exports.updatePostController = exports.createPostController = void 0;
const logging_1 = __importDefault(require("../logger/logging"));
const Post_1 = __importDefault(require("../models/Post"));
const Followers_1 = __importDefault(require("../models/Followers"));
/** Create a Post */
const createPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Getting the important details from the User */
    const { content } = req.body;
    try {
        // Saving the User Data to the Model
        const postContentDetails = yield new Post_1.default({
            content,
            userId: req.userDocument.userId
        }).save();
        // @ts-ignore
        return res.status(201).json({ "success": true, "data": { "postId": postContentDetails._id }, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.createPostController = createPostController;
/** Update a Post */
const updatePostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Getting the important details from the User */
    const { postId, content } = req.body;
    try {
        // Check if a post exists 
        let postUpdateDetails = yield Post_1.default.findByIdAndUpdate({ _id: postId }, { content });
        return res.status(204).json({ "success": true, "data": { "postId": postUpdateDetails === null || postUpdateDetails === void 0 ? void 0 : postUpdateDetails._id }, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.updatePostController = updatePostController;
/** Delete a Post */
const deletePostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Getting the important details from the User */
    const { postId } = req.body;
    try {
        // Check if a post exists 
        let postDeleteDetails = yield Post_1.default.findByIdAndDelete(postId);
        return res.status(200).json({ "success": true, "data": { "postId": postDeleteDetails === null || postDeleteDetails === void 0 ? void 0 : postDeleteDetails._id }, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.deletePostController = deletePostController;
/** Get all posts by a user */
const getAllPostsByAUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allPostsOfTheParticularUser = yield Post_1.default.find({ "userId": req.userDocument.userId });
        return res.status(200).json({ "success": true, "data": { allPostsOfTheParticularUser }, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.getAllPostsByAUser = getAllPostsByAUser;
/** Get a specific post */
const getAParticularPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.query;
    try {
        let particularPostRequestByTheUser = yield Post_1.default.findById(postId);
        return res.status(201).json({ "success": true, "data": { particularPostRequestByTheUser }, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.getAParticularPost = getAParticularPost;
/** Read a Post
 *  Both from Current Users as well as the Users followed
 */
const getPostsFromAllTheFollowings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.query;
    try {
        /**
         * Populate the Following of the User
         * Search up for their posts
         * Output the result
         */
        const getAllFollowingsOfTheUser = (yield Followers_1.default.findOne({ "userId": req.userDocument.userId }).populate('following', '_id username name'));
        let finalArrayOfUsers = [];
        for (let followers of getAllFollowingsOfTheUser.following) {
            // Lookup for the posts by the given user 
            // @ts-ignore
            const postFromTheCurrentIterativeUser = yield Post_1.default.find({ "userId": followers._id }).select({ "content": 1, "_id": 0 });
            // Creating the sample response
            let templateForStoringResponse = {
                name: followers.name,
                username: followers === null || followers === void 0 ? void 0 : followers.username,
                posts: postFromTheCurrentIterativeUser
            };
            // Pushing the aggregate
            finalArrayOfUsers.push(templateForStoringResponse);
        }
        return res.status(200).json({ "success": true, "data": finalArrayOfUsers, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.getPostsFromAllTheFollowings = getPostsFromAllTheFollowings;
