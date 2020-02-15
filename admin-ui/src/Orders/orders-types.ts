
export interface I_order extends I_formOrder{
    id: string
}

export interface I_formOrder {
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