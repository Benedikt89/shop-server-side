import {I_ordersActions, SET_ORDERS} from './actions';
import {I_order} from "../orders-types";

interface I_ordersState {
    orders:Array<I_order>
}
const initialState:I_ordersState = {
    orders: [
        {
            id: 'asdasd3w2effq2343qr',
            firstName: 'asda',
            lastName: 'sss',
            address: 'Minsk',
            city: 'Minsk',
            region: 'Minsk',
            country: 'Belarus',
            postalCode: '220111',
            phone: '123123123',
            email: '123123@tut.by',
            age: +'22'
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
