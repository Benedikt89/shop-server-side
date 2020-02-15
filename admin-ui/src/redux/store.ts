import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from '../App/reducer/reducer'
import authReducer from "../Login/reducer/authReducer";
import ordersReducer from "../Orders/reducer/ordersReducer";
import {I_ordersActions} from "../Orders/reducer/actions";
import {I_appActions} from "../App/reducer/actions";
import {I_authActions} from "../Login/reducer/actions";

const rootReducer = combineReducers({
    reducer: reducer,
    orders: ordersReducer,
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = I_authActions | I_appActions | I_ordersActions;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;