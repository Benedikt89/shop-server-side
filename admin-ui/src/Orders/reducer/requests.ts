import axios, {AxiosResponse} from "axios";
import { APIerrorLogger } from "../../utils/errorLogger";
import {GOOGLE_API_KEY} from "../../loginConfig";
import {I_orderCommon, I_orderFormData, I_orderInternalItem} from "../../../../core/orders-types";

const APIURL = "http://localhost:8000/api/orders";
const MAPURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";


export const ordersRequests = {
    getOrders(): Promise<Array<I_orderInternalItem> | never> {
        return  axios.get(`${APIURL}`)
            .then((res) => {
            return res.data;
        })
    },
    async addOrder(data: I_orderCommon) {
        try {
            let res: AxiosResponse<any | { error: string } | any> = await axios.post(`${APIURL}/create`, data);
            return res.data;
        } catch (err) {
            debugger;
            APIerrorLogger(err);
            throw err
        }
    },
    editOrder: (data: I_orderFormData) =>
        axios.put(`${APIURL}`, data),
    deleteOrder: (id: string) => axios.delete(`${APIURL}/delete/${id}`),
};

export const getLatLng = (address: string) => {
    return axios.get(
        `${MAPURL}${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    );
};