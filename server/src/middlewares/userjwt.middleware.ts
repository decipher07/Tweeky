import { Request, Response, NextFunction } from 'express';
import Logging from "../logger/logging";
import jwt from 'jsonwebtoken'
import { config } from '../config/config';
import { UserIdRequest } from '../types/app-request';

const decryptJWTToken = async (req: UserIdRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization){
        Logging.error("Access Denied! No token entered.")
        return res.status(401).json({
            message: "Access Denied! No token entered.",
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        const verified: any = await jwt.verify(token, config.jwt.secret) as any;
        req.userId = verified;
        next();
    } catch (err) {
        Logging.error("Access Denied! No token entered.")
        res.status(400).json({
            message: "Auth failed!",
        });
    }
}

export { decryptJWTToken };