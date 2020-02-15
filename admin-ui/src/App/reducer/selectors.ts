import {AppStateType} from "../../redux/store";

export const getIsFetching = (state:AppStateType) => state.reducer.isFetching;
export const getAppError = (state:AppStateType) => state.reducer.error;
