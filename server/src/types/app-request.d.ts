import { Request } from 'express';

declare interface UserIdRequest extends Request {
    userId: any;
}

export { UserIdRequest };