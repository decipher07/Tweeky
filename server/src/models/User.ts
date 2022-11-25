import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password?: string;
    username: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String },
        username: { type: String }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);