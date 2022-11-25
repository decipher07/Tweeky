import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IPost {
    userId: IUser;
    content: string;
}

export interface IPostModel extends IPost, Document {}

/** Representing a mock of post schema. 
 *  To reduce the complexity, We're not considering additional details of a post
 *  such as likes, retweets and reposts.
 */
const PostSchema: Schema = new Schema(
    {
        content: { type: String, require: true },
        userId: { type: String, require: true, ref: "User" },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IPostModel>('Posts', PostSchema);