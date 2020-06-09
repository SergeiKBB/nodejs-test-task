import axios from 'axios';
import crypto from 'crypto';
import models from '../models';
import {RUG_URL} from '../constans';
import {IUser} from '../interfaces/user.interface';
import {removePasswordFromUserDocument, transformUsers} from "../helpers";
import {IUserDocument} from "../models/user.model";

export default class UserService {
    static async getUserFromRUG(): Promise<IUser[]> {
        const result = await axios.get(RUG_URL);
        return transformUsers(result?.data?.results);
    }

    static async generateUsers(): Promise<IUserDocument[]> {
        const users: IUser[] = await this.getUserFromRUG();
        return models.UserModel.create(users);
    }

    static async getUsers(): Promise<IUserDocument[]> {
        const users = await models.UserModel.find({});
        return users.map(removePasswordFromUserDocument)
    }

    static async updateUserById(id: string, data: IUser): Promise<IUserDocument | null> {
        const user = await models.UserModel.findByIdAndUpdate(id, data);
        return user && removePasswordFromUserDocument(user);
    }

    static async deleteUserById(id: string): Promise<IUserDocument | null> {
        const user = await models.UserModel.findByIdAndDelete(id);
        return user && removePasswordFromUserDocument(user)
    }

    static async login(email: string, password: string) {
        const user: IUserDocument | null = await models.UserModel.findOne({email});
        const hashedPassword = await crypto.createHash('sha256').update(password+user?.password?.salt).digest('hex');
        return hashedPassword === user?.password?.sha256;
    }
}
