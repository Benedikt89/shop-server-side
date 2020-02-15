import mongoose, {Schema, Document, Model} from "mongoose";
import {I_mongooseContactData, I_contactCommonData} from "../../../../../core/contacts-types";
mongoose.Promise = global.Promise;

export interface I_mongooseContactModel extends I_contactCommonData, Document {
    id: string
    getFullDataToSend(): I_mongooseContactData,
    toClient(): I_mongooseContactData
}

const contactSchema: Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    region: {type: String, required: true},
    country: {type: String, required: true},
    postalCode: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, unique: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i},
    age: {type: Number, required: true},
    __v: {type: Number, select: false}
});

//adding methods to schema
contactSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

contactSchema.methods.getFullDataToSend = function (): I_mongooseContactData {
    return {
        id: this.id,
        firstName: this.firstName ? this.firstName : 'null',
        lastName: this.lastName ? this.lastName : 'null',
        address: this.address ? this.address : 'null',
        city: this.city,
        region: this.region,
        country: this.country,
        postalCode: this.postalCode,
        phone: this.phone,
        email: this.email,
        age: this.age
    }
};
contactSchema.methods.toClient = function(): I_mongooseContactData {
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
};

const Contact: Model<I_mongooseContactModel> = mongoose.model('contacts', contactSchema);
export default Contact