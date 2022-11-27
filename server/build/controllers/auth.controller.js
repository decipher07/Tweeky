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
exports.redirectGoogleAuthController = exports.getGoogleAuthURLController = void 0;
const utils_1 = require("../auth/utils");
const googleapis_1 = require("googleapis");
const logging_1 = __importDefault(require("../logger/logging"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Followers_1 = __importDefault(require("../models/Followers"));
/* Server redirection to different website */
const getGoogleAuthURLController = (req, res) => {
    return res.redirect((0, utils_1.getGoogleAuthURL)());
};
exports.getGoogleAuthURLController = getGoogleAuthURLController;
/*  Redirect Google Controller
    This gets hit after the oauth is performed from OAuth
*/
const redirectGoogleAuthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        /* Get the tokens credentials to be added for OAuth */
        const { tokens } = yield utils_1.oauth2Client.getToken(code);
        utils_1.oauth2Client.credentials = tokens;
        /* Google SDK for Google Plus Integration */
        let googleOAuthInfoRedirect = googleapis_1.google.oauth2({ version: 'v2', auth: utils_1.oauth2Client });
        /* Getting the Google User Information */
        const googleUserInfo = yield googleOAuthInfoRedirect.userinfo.get();
        const { name, email } = googleUserInfo.data;
        // Validating Email exists or not
        const emailValidationForPreviousExistingEntries = yield User_1.default.exists({ email });
        if (emailValidationForPreviousExistingEntries) {
            const userDocument = (yield User_1.default.findOne({ email }));
            const token = jsonwebtoken_1.default.sign({
                // @ts-ignore
                userId: userDocument === null || userDocument === void 0 ? void 0 : userDocument._id,
                email: userDocument.email
            }, config_1.config.jwt.secret, {
                expiresIn: "30d"
            });
            return res.status(200).json({ "success": true, "data": { token }, "message": null });
        }
        // Saving the User Data to the Model
        const userDocument = yield new User_1.default({
            name,
            email
        }).save();
        // Save the Following Models
        yield new Followers_1.default({
            "userId": userDocument === null || userDocument === void 0 ? void 0 : userDocument._id,
            following: []
        }).save();
        const token = jsonwebtoken_1.default.sign({
            // @ts-ignore
            userId: userDocument === null || userDocument === void 0 ? void 0 : userDocument._id,
            email: userDocument.email
        }, config_1.config.jwt.secret, {
            expiresIn: "30d"
        });
        return res.status(201).json({ "success": true, "data": { token }, "message": null });
    }
    catch (err) {
        logging_1.default.error(err.message);
        return res.status(500).json({ "success": false, "data": null, "message": "Error in redirecting" });
    }
});
exports.redirectGoogleAuthController = redirectGoogleAuthController;
