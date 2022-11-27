import dotenv from 'dotenv';

dotenv.config();

/* Server Configuration */
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3001;

/* Google OAuth Configurations */
const GOOGLE_CLIENT_ID : string = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET : string = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI : string = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3001/auth/redirect"

/* MongoDB Configurations */
const MONGO_URL: string = process.env.MONGO_URL || ''

/* JWT Configurations*/
const JWT_SECRET: string = process.env.JWT_SECRET || 'squareboat'

export const config = {
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