export interface I_orderFormData {
    phone: string,
    first_name: string,
    delivery_date: string,
    delivery_time: string,
    address: string,
    comment: string,
    payment: string,
}
export interface I_postOrderItem {
    pizza: string,
    quantity: number,
}

export interface I_orderCommon extends I_orderFormData{
    order_items: Array<I_postOrderItem>
}

export interface I_orderInternalItem extends I_orderCommon{
    id: string,
    createdAt: Date
    checked: null | string
    delivered: null | Date
}

export interface I_orderDates {
    "month": number,
    "work_dates": {"date": string}[]
}