import {AppActionsType, AppStateType} from "../../redux/store";
import {fetchData} from "./api-actions";
import {ThunkDispatch} from "redux-thunk";

type GetStateType = () => AppStateType

export const SET_FETCH_SUCCESS = 'app/SET_FETCH_SUCCESS';
export const SET_IS_FETCHING = 'app/SET_IS_FETCHING';
export const SET_ERROR = 'app/SET_ERROR';


export type I_appActions =
    I_toggleIsFetching  |
    I_fetchSuccess | I_setError

//interfaces
interface I_fetchSuccess {
    type: typeof SET_FETCH_SUCCESS
}

interface I_toggleIsFetching {
    type: typeof SET_IS_FETCHING,
    status: boolean
}

interface I_setError {
    type: typeof SET_ERROR,
    message: null | string
}




//Internal ACTIONS CREATORS
export const _fetchSuccess = (): I_fetchSuccess => ({ type: SET_FETCH_SUCCESS });

export const _toggleIsFetching = (status: boolean): I_toggleIsFetching => ({ type: SET_IS_FETCHING, status});

export const _setError = (message: string | null): I_setError => ({ type: SET_ERROR, message});


//EXTERNAL ACTIONS
export const fetchAll = () =>
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
        setTimeout(async () => {
                await Promise.all([dispatch(fetchData())]);
            dispatch(_setError(null));
        }, 1000)
    };