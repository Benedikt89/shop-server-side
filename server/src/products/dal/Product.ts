import mongoose, {Schema, Document} from "mongoose";

export interface IMongoose_Product extends Document {
    id: string,
    name: string,
    photo: string,
    price: number,
    size: number,
    text_long: string,
    text_short: string,
}

const productSchema:Schema = new Schema({
    name: {type:String, required: true},
    photo: {type:String, required: true},
    price: {type: Number, required: true},
    size: {type: Number, required: true},
    text_long: {type:String, required: true},
    text_short: {type:String, required: true},
});
const User = mongoose.model<IMongoose_Product>('pizzas', productSchema);

export default User;