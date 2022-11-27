"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./logger/logging"));
const config_1 = require("./config/config");
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const mongoose_1 = __importDefault(require("./database/mongoose"));
const signup_router_1 = __importDefault(require("./routers/signup.router"));
const posts_router_1 = __importDefault(require("./routers/posts.router"));
const followers_router_1 = __importDefault(require("./routers/followers.router"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
/* Connecting to the Database */
mongoose_1.default.then(() => {
    logging_1.default.info('MongoDB connected successfully.');
})
    .catch((error) => logging_1.default.error(error));
/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging_1.default.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        /** Log the res */
        logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });
    next();
});
/** Auth routes */
app.use('/auth', auth_router_1.default);
/** User Signup/Login routes */
app.use('/sign', signup_router_1.default);
/** Post routes */
app.use('/posts', posts_router_1.default);
/** Followers routes */
app.use('/follow', followers_router_1.default);
app.get('/ping', (req, res, next) => res.status(200).json({ "message": "Server Working Successfully!" }));
/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');
    logging_1.default.error(error.message);
    res.status(404).json({
        message: error.message
    });
});
/** Listening on port */
app.listen(config_1.config.server.port, () => logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
