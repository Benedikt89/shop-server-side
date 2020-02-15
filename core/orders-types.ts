
export interface I_contactCommonData {
    firstName:string,
    lastName: string,
    address: string,
    city: string,
    region: string,
    country: string,
    postalCode: string,
    phone: string,
    email: string,
    age: number
}

export interface I_mongooseContactData extends I_contactCommonData{
    id: string,
}