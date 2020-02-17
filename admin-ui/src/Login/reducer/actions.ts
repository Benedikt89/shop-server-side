import {AppActionsType, AppStateType} from "../../redux/store";
import {authAPI} from "./api";
import {ThunkDispatch} from "redux-thunk";
import {_setError, _toggleIsFetching} from "../../App/reducer/actions";
import {I_authUserData, I_loginData } from "../auth-types";
import {I_authToFrontUserData} from "../../../../core/users-types";

type GetStateType = () => AppStateType

export const LOGOUT_USER_SUCCESS = 'app/auth/LOGOUT_USER_SUCCESS';
export const SET_USER_DATA = 'app/auth/SET_USER_DATA';

export type I_authActions =
    I_userSessionDataAC | I_logoutUserSuccessAC

//interfaces
interface I_userSessionDataAC {
    type: typeof SET_USER_DATA,
    payload: I_authUserData
}

interface I_logoutUserSuccessAC {
    type: typeof LOGOUT_USER_SUCCESS
}


//ACTIONS CREATORS
export const _setAuthUserData = (payload: I_authUserData): I_userSessionDataAC => ({type: SET_USER_DATA, payload});
export const logOutSuccess = (): I_logoutUserSuccessAC => ({type: LOGOUT_USER_SUCCESS});


//EXTERNAL ACTIONS
export const loginUserThunk = (data: I_loginData) =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
        try {
            let res: I_authToFrontUserData = await authAPI.loginUser(data);
            dispatch(_setAuthUserData(res));
        } catch (err) {
            console.log(JSON.parse(JSON.stringify(err)));
            //if its no data return
            if (err.res && (err.res.status === 403 || err.res.status === 401)) {
                dispatch(_toggleIsFetching(false));
                dispatch(_setError(null));
            } else {
                dispatch(_setError('network Problems'));
                dispatch(_toggleIsFetching(false));
            }
        }
    };
export const registerUser = (data: I_loginData) =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
        try {
            let res: I_authToFrontUserData = await authAPI.registerUser(data);
            dispatch(_setAuthUserData(res));
        } catch (err) {
            console.log(JSON.parse(JSON.stringify(err)));
        }
    };
export const recoverPassword = (phone: string) =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
        try {
            let result = await authAPI.recoverPassword(phone);
        debugger
            return result
        } catch (err) {
            console.log("recoverPassword error - " + err)
        }
    };
export const logOut = () =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
        try {
            let result = await authAPI.logOut();
            dispatch(logOutSuccess())
        } catch (err) {
            console.log("recoverPassword error - " + err)
        }
    };