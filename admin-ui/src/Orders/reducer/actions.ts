import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, AppStateType} from "../../redux/store";
import {ordersRequests} from "./requests";
import {I_orderCommon, I_orderInternalItem} from "../../../../core/orders-types";

export const SET_ORDERS = 'orders/SET_ORDERS';

type GetStateType = () => AppStateType
interface I_setOrders {
    type: typeof SET_ORDERS,
    payload: Array<I_orderInternalItem>
}
export const setOrders = (orders: Array<I_orderInternalItem>):I_setOrders => {
    return {
        type: SET_ORDERS,
        payload: orders
    }
};

export const getOrders = () => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        let response:Array<I_orderInternalItem> = await ordersRequests.getOrders();
        if (response.length > 0) {
            dispatch(setOrders(response));
        }
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export const addOrder = (data: I_orderCommon) => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        const sedData:I_orderCommon = {...data, order_items:[{pizza: 'asd', quantity: 2}]};
        let response = await ordersRequests.addOrder(sedData);
        console.log(JSON.parse(JSON.stringify(response)));
        dispatch(getOrders);
    } catch (err) {
        debugger;
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export const editOrder = (data: I_orderInternalItem) => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        let response = await ordersRequests.editOrder(data);
        console.log(JSON.parse(JSON.stringify(response)));
        dispatch(getOrders);
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export const deleteOrder = (id: string) => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        let response = await ordersRequests.deleteOrder(id);
        console.log(JSON.parse(JSON.stringify(response)));
        await dispatch(getOrders);
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export type I_ordersActions = I_setOrders