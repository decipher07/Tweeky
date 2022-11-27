"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleAuthURL = exports.oauth2Client = void 0;
const googleapis_1 = require("googleapis");
const config_1 = require("../config/config");
const oauth2Client = new googleapis_1.google.auth.OAuth2(config_1.config.auth.clientId, config_1.config.auth.clientSecret, config_1.config.auth.redirectUri);
exports.oauth2Client = oauth2Client;
const getGoogleAuthURL = () => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/spreadsheets'
    ];
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes
    });
};
exports.getGoogleAuthURL = getGoogleAuthURL;
