import {I_ordersActions, SET_ORDERS} from './actions';
import {I_orderInternalItem} from "../../../../core/orders-types";

interface I_ordersState {
    orders:Array<I_orderInternalItem>
}
const initialState:I_ordersState = {
    orders: [
        {
            id: 'asdasd3w2effq2343qr',
            first_name: 'asda',
            address: 'Minsk',
            phone: '123123123',
            payment: '0',
            comment: 'asd',
            checked: null,
            delivered: null,
            delivery_time: '4',
            delivery_date: '22-22-2020',
            createdAt: '22-22-2020',
            order_items: []
        }
    ],
};

const ordersReducer = (state:I_ordersState = initialState, action: I_ordersActions) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: JSON.parse(JSON.stringify(action.payload))
            };
        default:
            return state
    }
};

export default ordersReducer;
