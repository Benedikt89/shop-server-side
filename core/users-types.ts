export interface I_loginData {
    phone: string,
    password: string
}

export interface I_userFullInfoData extends I_loginData{
    id: string,
    photo?: string,
    birth_date?: Date,
    createdAt: Date,
    firstName?: string,
    lastName?: string,
    updated?: Date
    isAdmin?: boolean | null,
}
export interface I_authMongooseUserData {
    id: string,
    phone: string,
    firstName: string | null,
    lastName: string | null,
    birth_date: Date | null,
    photo: string | null,
    isAdmin: boolean | null,
    createdAt: Date | null,
    updated: Date | null
}
export interface I_authToFrontUserData extends I_authMongooseUserData{
    tokenDeathTime: number | null,
    rememberMe: boolean | null,
}