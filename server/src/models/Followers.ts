import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IFollowers {
    userId: IUser;
    following: [IUser];
}

export interface IFollowersModel extends IFollowers, Document {}

/** Representing a mock of followers schema. 
 *  To reduce the complexity, We're not considering additional details of a follower
 *  such as blocks and social activity.
 */
 const FollowersSchema: Schema = new Schema(
    {
        userId: { type: String, require: true, ref: "User" },
        following: [ { type: String, ref: "User" }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IFollowersModel>('Followers', FollowersSchema);