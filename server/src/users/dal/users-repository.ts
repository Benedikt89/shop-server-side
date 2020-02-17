import mongoose, {DocumentQuery} from "mongoose";
import User, {I_mongooseUserModel} from './User';
import { I_authMongooseUserData, I_userFullInfoData } from "../../../../core/users-types";
import {ENV_URL} from "../../config";


export const usersRepository = {
    async addUser(user: I_userFullInfoData): Promise<I_authMongooseUserData | never> {
        try {
            const newUser = await new User(user).save();
            return new Promise(((resolve, reject) => resolve
            (newUser.getFullDataToSend())))
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },
    async getUserInfo(userPhone: string): Promise<I_authMongooseUserData | never>  {
        try {
            let doc = await User.find({phone: userPhone});
            return new Promise((resolve, reject) => {
                resolve(doc[0].getFullDataToSend())
            })
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },

    getUser(userPhone: string): DocumentQuery<I_mongooseUserModel[], I_mongooseUserModel> & {} {
        return User.find({ phone: userPhone });
    },

    async updateUser(newUserInfo: I_userFullInfoData): Promise<I_userFullInfoData> {
        try {
            return await User.update({_id: newUserInfo.id}, newUserInfo)
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },

    async deleteUser(userId: string): Promise<any> {
        try {
            return User.deleteOne({_id: userId});
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },
};