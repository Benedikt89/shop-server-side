import {
    I_appActions,
    SET_ERROR, SET_FETCH_SUCCESS,
    SET_IS_FETCHING
} from "./actions";
import {I_appState} from "../../types/app-types";

const initialState: I_appState = {
    isFetching: false,
    error: null
};


const reducer = (state: I_appState = initialState, action: I_appActions) => {
    switch (action.type) {
        //setting fetching and frozen status
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.message
            };
        //adding fetched data to state
        case SET_FETCH_SUCCESS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};


export default reducer;