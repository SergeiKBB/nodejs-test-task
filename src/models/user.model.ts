import { Schema, model, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema({
    name: {
        title: { type: String, required: true },
        first: { type: String, required: true},
        last: { type: String, required: true}
    },
    gender: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    picture: {
        large: { type: String, require: true },
        medium: { type: String, require: true },
        thumbnail: { type: String, require: true }
    },
    password: {
        sha256: { type: String, required: true },
        salt: { type: String, required: true }
    },
    removed: { type: Boolean, required: true}
});

export default model<IUserDocument>('User', userSchema);
