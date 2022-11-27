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
exports.loginController = exports.updatePasswordController = exports.updateUserNameController = exports.createUserController = void 0;
const logging_1 = __importDefault(require("../logger/logging"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Followers_1 = __importDefault(require("../models/Followers"));
/** Signing up User */
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Getting the important details from the User */
    const { name, email, password, username } = req.body;
    try {
        // Validating Username exists or not
        const usernameValidationForPreviousExistingEntries = yield User_1.default.exists({ username });
        if (usernameValidationForPreviousExistingEntries) {
            return res.status(403).json({ "success": false, "data": null, "message": "Username already exists" });
        }
        // Validating Email exists or not
        const emailValidationForPreviousExistingEntries = yield User_1.default.exists({ email });
        if (emailValidationForPreviousExistingEntries) {
            return res.status(403).json({ "success": false, "data": null, "message": "Email already exists" });
        }
        // Generating the hash of the password 
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
        // Saving the User Data to the Model
        const userDocument = yield new User_1.default({
            name,
            password: hashedPassword,
            username,
            email
        }).save();
        // Save the Following Models
        yield new Followers_1.default({
            "userId": userDocument === null || userDocument === void 0 ? void 0 : userDocument._id,
            following: []
        }).save();
        return res.status(201).json({ "success": true, "data": null, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.createUserController = createUserController;
/** Updating Username */
const updateUserNameController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Getting the important details from the User */
    const { username } = req.body;
    try {
        // Validating Username exists or not
        const usernameValidationForPreviousExistingEntries = yield User_1.default.exists({ username });
        if (usernameValidationForPreviousExistingEntries) {
            return res.status(403).json({ "success": false, "data": null, "message": "Username already exists" });
        }
        yield User_1.default.updateOne({ "_id": req.userDocument.userId }, { $set: { username } });
        return res.status(200).json({ "success": true, "data": null, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.updateUserNameController = updateUserNameController;
/** Updating Password */
const updatePasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Getting the important details from the User */
    const { password } = req.body;
    try {
        // Validating Username exists or not
        const usernameValidationForPreviousExistingEntries = yield User_1.default.exists({ "_id": req.userDocument.userId });
        if (!usernameValidationForPreviousExistingEntries) {
            return res.status(403).json({ "success": false, "data": null, "message": "UserId does not exists" });
        }
        // Generating the hash of the password 
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
        yield User_1.default.updateOne({ "_id": req.userDocument.userId }, { $set: { password: hashedPassword } });
        return res.status(200).json({ "success": true, "data": null, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.updatePasswordController = updatePasswordController;
/** Login Controller */
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Getting the important details from the User */
    const { email, password } = req.body;
    try {
        // Validating Email exists or not
        const emailValidationForPreviousExistingEntries = yield User_1.default.exists({ email });
        if (!emailValidationForPreviousExistingEntries) {
            return res.status(403).json({ "success": false, "data": null, "message": "No Email already exists" });
        }
        // Finding the document
        const userDocument = (yield User_1.default.findOne({ email }));
        // Comparing the hash of the password 
        if (!(yield (0, bcryptjs_1.compare)(password, userDocument.password)))
            return res.status(403).json({ "success": false, "data": null, "message": "Incorrect password" });
        const token = jsonwebtoken_1.default.sign({
            // @ts-ignore
            userId: userDocument === null || userDocument === void 0 ? void 0 : userDocument._id,
            email: userDocument.email
        }, config_1.config.jwt.secret, {
            expiresIn: "30d"
        });
        return res.status(200).json({ "success": true, "data": { token }, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Something went wrong" });
    }
});
exports.loginController = loginController;
