import mongoose, {Schema, Document, Model} from "mongoose";
import {I_orderInternalItem} from "../../../../core/orders-types";
mongoose.Promise = global.Promise;

export interface I_mongooseOrderModel extends I_orderInternalItem, Document {
    id: string
    getFullData(): I_orderInternalItem,
    toClient(): I_orderInternalItem
}

const orderSchema: Schema = new Schema({
    phone: {type: String, required: true},
    first_name: {type: String, required: true},
    delivery_date: {type: String, required: true},
    delivery_time: {type: Number, required: true},
    address: {type: String, required: true},
    comment: {type: String, required: true},
    payment: {type: Number, required: true},
    createdAt: {type: Date},
    checked: {type: String},
    delivered: {type: Date},
    order_items: {type: Array, required: true},
    __v: {type: Number, select: false}
});

//adding methods to schema
orderSchema.methods.getFullData = function (): I_orderInternalItem {
    return {
        id: this.id,
        phone: this.phone,
        first_name: this.first_name,
        delivery_date: this.delivery_date,
        delivery_time: this.delivery_time,
        address: this.address,
        comment: this.comment,
        payment: this.payment,
        order_items: this.order_items,
        createdAt: this.createdAt,
        checked: this.checked ? this.checked : null,
        delivered: this.delivered ? this.delivered : null,
    }
};
orderSchema.methods.toClient = function(): I_orderInternalItem {
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
};
orderSchema.pre<I_mongooseOrderModel>('save', function (next: any) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now.toDateString();
    }
    next();
});

const Order: Model<I_mongooseOrderModel> = mongoose.model('orders', orderSchema);
export default Order