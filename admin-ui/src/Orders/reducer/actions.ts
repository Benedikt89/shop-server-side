import {I_order, I_formOrder} from "../orders-types";
import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, AppStateType} from "../../redux/store";
import {ordersRequests} from "./requests";

export const SET_ORDERS = 'orders/SET_ORDERS';

type GetStateType = () => AppStateType
interface I_setOrders {
    type: typeof SET_ORDERS,
    payload: Array<I_order>
}
export const setOrders = (orders: Array<I_order>):I_setOrders => {
    return {
        type: SET_ORDERS,
        payload: orders
    }
};

export const getOrders = () => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        let response = await ordersRequests.getOrders();
        dispatch(setOrders(response));
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export const addOrder = (data: I_formOrder) => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    try {
        let response = await ordersRequests.addOrder(data);
        console.log(JSON.parse(JSON.stringify(response)));
        dispatch(getOrders);
    } catch (err) {
        debugger;
        console.log(JSON.parse(JSON.stringify(err)));
    }
};
export const editOrder = (data: I_order) => async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
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