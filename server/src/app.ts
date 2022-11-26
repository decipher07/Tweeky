import express, { Response, Request, NextFunction, Express } from "express";
import Logging from "./logger/logging";
import { config } from './config/config';
import authRoutes from './routers/auth.router'
import connectToMongoDB from './database/mongoose'
import signingRoutes from './routers/signup.router'
import postsRoutes from './routers/posts.router'
import followRoutes from './routers/followers.router'

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Connecting to the Database */
connectToMongoDB.then(() => {
    Logging.info('MongoDB connected successfully.');
})
.catch((error) => Logging.error(error));


/** Rules of our API */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


/** Log the request */
app.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
});


/** Auth routes */
app.use('/auth', authRoutes);

/** User Signup/Login routes */
app.use('/sign', signingRoutes);

/** Post routes */
app.use('/posts', postsRoutes);

/** Followers routes */
app.use('/follow', followRoutes);

app.get('/ping', (req: Request, res: Response, next: NextFunction) => res.status(200).json({"message": "Server Working Successfully!"}));

/** Error handling */
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');
    Logging.error(error.message);

    res.status(404).json({
        message: error.message
    });
});


/** Listening on port */
app.listen(config.server.port, () : void => Logging.info(`Server is running on port ${config.server.port}`))