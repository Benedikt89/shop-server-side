import {I_authState, I_eventObject} from "../auth-types";

import {I_authActions, LOGOUT_USER_SUCCESS, SET_USER_DATA} from "./actions";

let initialState: I_authState = {
    userData: {
        id: null,
        phone: null,
        firstName: null,
        lastName: null,
        birth_date: null,
        photo: null,
        isAdmin: null,
        createdAt: null,
        updated: null,
    },
    events: [
        {
            name: 'AUTH_FETCHING',
            status: false,
            message: null
        },
        {
            name: 'AUTH_SUCCESS',
            status: false,
            message: null
        },
        {
            name: 'AUTH_ERROR',
            status: false,
            message: null
        },
    ]
};

const authReducer = (state: I_authState = initialState, action: I_authActions) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                userData: {...state.userData, ...action.payload},
                events: state.events.map((e: I_eventObject) => {
                    if (e.name === 'AUTH_FETCHING') {
                        return {...e, status: false, message: null}
                    } else if (e.name === 'AUTH_SUCCESS') {
                        return {...e, status: true, message: null}
                    } else
                        return e
                })
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                events: state.events.map((e: I_eventObject) => {
                    if (e.name === 'AUTH_SUCCESS') {
                        return {...e, status: true, message: null}
                    } else
                        return e
                })
            }
        }
        default:
            return state;
    }
};


export default authReducer;





