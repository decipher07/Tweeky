"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* Server Configuration */
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
/* Google OAuth Configurations */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3001/auth/redirect";
/* MongoDB Configurations */
const MONGO_URL = process.env.MONGO_URL || '';
/* JWT Configurations*/
const JWT_SECRET = process.env.JWT_SECRET || 'squareboat';
exports.config = {
    server: {
        port: SERVER_PORT
    },
    auth: {
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        redirectUri: GOOGLE_REDIRECT_URI
    },
    database: {
        url: MONGO_URL
    },
    jwt: {
        secret: JWT_SECRET
    }
};
