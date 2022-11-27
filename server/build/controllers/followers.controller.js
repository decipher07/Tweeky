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
exports.getAllUsers = exports.getAllFollowingsOfTheUser = exports.followAUserController = void 0;
const logging_1 = __importDefault(require("../logger/logging"));
const Followers_1 = __importDefault(require("../models/Followers"));
const User_1 = __importDefault(require("../models/User"));
/** Follow a Given Person */
const followAUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Getting the other userId from the User */
    const { userIdRecipient } = req.body;
    try {
        // Checking if the UserId Exists or not
        const checkIfTheRecipientUserExistsOrNot = yield User_1.default.exists({ "_id": userIdRecipient });
        if (!checkIfTheRecipientUserExistsOrNot)
            return res.status(403).json({ "success": false, "data": null, "message": "The Recipient UserId does not exists" });
        // Check if the current user is already following the recipient User
        const checkIfTheRecipientUserAlreadyExistsInTheCurrentUserFollowing = yield Followers_1.default.exists({ "userId": req.userDocument.userId, "following": { $in: [userIdRecipient] } });
        if (checkIfTheRecipientUserAlreadyExistsInTheCurrentUserFollowing)
            return res.status(418).json({ "success": false, "data": null, "message": "The user is already following the given user" });
        // Append the list
        let followerUpdateDocument = yield Followers_1.default.updateOne({ "userId": req.userDocument.userId }, { $push: { 'following': userIdRecipient } });
        // Check if the document was modified or not
        if (!followerUpdateDocument.modifiedCount)
            return res.status(418).json({ "success": false, "data": null, "message": "No Follower added" });
        return res.status(202).json({ "success": true, "data": null, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.followAUserController = followAUserController;
/** See the list of your followings */
const getAllFollowingsOfTheUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all the followers from the users
        const detailsOfTheUser = yield Followers_1.default.find({ "userId": req.userDocument.userId }).populate('following', 'name username');
        return res.status(200).json({ "success": true, "data": detailsOfTheUser, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.getAllFollowingsOfTheUser = getAllFollowingsOfTheUser;
/** Get all the Users in the database */
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all the followers from the users
        const detailsOfAllTheUser = yield User_1.default.find({ "_id": { $ne: req.userDocument.userId } }).select({ "name": 1, "_id": 1, "username": 1 });
        return res.status(200).json({ "success": true, "data": detailsOfAllTheUser, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.getAllUsers = getAllUsers;
