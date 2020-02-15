import {AppStateType} from "../../redux/store";

export const getIsAuth = (state:AppStateType) =>
    state.auth.events.filter(e => e.name === 'AUTH_SUCCESS')[0].status;
