export interface I_loginData {
    phone: string,
    password: string
}

export interface I_eventObject {
    name: I_eventType,
    status: boolean,
    message: string | null
}

export type I_eventType = 'AUTH_FETCHING' | 'AUTH_ERROR' | 'LOGIN_ERROR' | 'REGISTER_ERROR' | 'AUTH_SUCCESS'


export interface I_authUserData {
    id: string | null,
    email: string | null,
    firstName: string | null,
    lastName: string | null,
    birth_date: Date | null,
    photo: string | null,
    isAdmin: boolean | null,
    createdAt: Date | null,
    updated: Date | null,
    tokenDeathTime: number | null,
    rememberMe: boolean | null,
}

export interface I_authState {
    userData: I_authUserData
    events: Array<I_eventObject>
}



