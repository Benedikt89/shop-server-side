import {_fetchSuccess, _setError, _toggleIsFetching, I_appActions} from "./actions";
import {AppStateType} from "../../redux/store";
import {ThunkDispatch} from "redux-thunk";

type GetStateType = () => AppStateType


//API ACTIONS
export const fetchData = () =>
    async (dispatch: ThunkDispatch<{}, {}, I_appActions>) => {
        try {
            dispatch(_toggleIsFetching(true));
            await new Promise((resolve)=>{resolve('asd')});
            dispatch(_toggleIsFetching(false));
        } catch (err) {
            console.log(err);
            //if its no data return
            if (err.response && err.response.config.url === "api.user.getstate" && err.response.status === 403) {
                dispatch(_toggleIsFetching(false));
                dispatch(_setError(null));
            } else {
                dispatch(_setError('network Problems'));
                dispatch(_toggleIsFetching(false));
            }
        }
    };