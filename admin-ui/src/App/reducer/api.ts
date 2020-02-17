import axios from "axios";
import {APIerrorLogger} from "../../utils/errorLogger";

const instance = axios.create({
    baseURL: "https://dry-forest-56016.herokuapp.com/auth",
    withCredentials: true
});

export let responseType: any;

export const authAPI = {
    loginUser(phone: string, password: string, rememberMe: boolean)  {
        return instance
            .post(`/login`,{phone, password, rememberMe })
            .then((response: any) => {
                responseType = typeof response
                return response
            })
            .catch((err:any)=> {
                APIerrorLogger(err);
                if (err.response.status === 500) {
                    return null;
                } else {
                    throw err;
                }
            })
    }
}

