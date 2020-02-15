import mongoose, {Schema, Document, Model, DocumentQuery} from "mongoose";
import bcrypt from 'bcryptjs';
import {I_authMongooseUserData, I_userFullInfoData} from "../../../../core/users-types";
import {ENV_URL} from "../../config";
mongoose.Promise = global.Promise;

export interface I_mongooseUserModel extends I_userFullInfoData, Document {
    id: string
    createdAt: Date
    fullName(): string,

    getFullDataToSend(): I_authMongooseUserData,
}

const userSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    photo: {type: String},
    birth_date: {type: Date},
    isAdmin: {type: Boolean},
    createdAt: {type: Date, required: true},
    updated: {type: Date},
    __v: {type: Number, select: false}
});

//adding methods to schema
userSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

userSchema.methods.getFullDataToSend = function (): I_authMongooseUserData {
    return {
        id: this.id,
        email: this.email,
        photo: this.photo ? `${ENV_URL + this.photo}` : null,
        birth_date: typeof this.birth_date === Date() && this.birth_date ? this.birth_date : null,
        createdAt: this.createdAt,
        firstName: this.firstName ? this.firstName : null,
        lastName: this.lastName ? this.lastName : null,
        isAdmin: this.isAdmin ? this.isAdmin : null,
        updated: typeof this.updated === Date() ? this.updated : null,
    }
};
// hash user password before saving into database and add CreatedAt
userSchema.pre<I_mongooseUserModel>('save', function (next: any) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User: Model<I_mongooseUserModel> = mongoose.model('users', userSchema);
export default User