import mongoose, {DocumentQuery} from "mongoose";
import Order, {I_mongooseOrderModel} from './Order';
import { I_orderInternalItem, I_orderCommon } from "../../../../core/orders-types";

export const ordersRepository = {
    async addOrder(order: I_orderCommon): Promise<I_orderInternalItem | never> {
        try {
            const newOrder = await new Order({
                first_name: order.first_name,
                phone: order.phone,
                address: order.address,
                delivery_date: order.delivery_date,
                delivery_time: order.delivery_time,
                comment: order.comment,
                payment: order.payment,
                order_items: order.order_items
            }).save();
            return new Promise(((resolve, reject) => resolve
            (newOrder.getFullData())))
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },

    getOrders(): DocumentQuery<I_mongooseOrderModel[], I_mongooseOrderModel> & {} {
        return Order.find();
    },

    async updateOrder(newOrderInfo: I_orderInternalItem): Promise<I_mongooseOrderModel> {
        try {
            return await Order.update({_id: newOrderInfo.id}, newOrderInfo)
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },

    async deleteOrder(orderId: string): Promise<any> {
        try {
            return Order.deleteOne({_id: orderId});
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },
};