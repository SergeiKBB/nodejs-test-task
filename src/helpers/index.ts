import {IRandomUser, IUser} from "../interfaces/user.interface";
import {IUserDocument} from "../models/user.model";

export const transformUsers = (users: IRandomUser[]): IUser[] => {
    const transformedUsers = users && users.map((user) => {
        const {name, gender, email, picture, login} = user;
        return {
            name,
            gender: gender,
            email: email,
            picture: picture,
            password: {
                sha256: login?.sha256,
                salt: login?.salt
            },
            removed: false,
        }
    })
    return transformedUsers;
}

export const removePasswordFromUserDocument = (user:IUserDocument): IUserDocument => {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj
};
