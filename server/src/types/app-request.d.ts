import { Request } from 'express';

declare interface UserIdRequest extends Request {
    userDocument: any;
}

export { UserIdRequest };