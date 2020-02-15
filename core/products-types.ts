export interface I_productToCreate {
    filter?: Array<I_filterItem>,
    photo: string,
    name: string,
    price: number,
    size: number,
    text_long: string,
    text_short: string
}
export interface I_productItem extends I_productToCreate{
    id: string,
    photo_thumbnail?: string,
}

export interface I_productsResponse {
    count: number,
    products: Array<I_productItem>
}


export interface I_filterItem {
    name: string
}

