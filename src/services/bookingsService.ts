import axios, {AxiosInstance} from "axios";

import { apiUrl } from '../config/index';

const bookingInstance: AxiosInstance = axios.create({
    baseURL: apiUrl + '/bookings',
    headers:{
        'Content-Type': 'application/json',
    }
});

type getRequestType = {
    url: string,
    headers?:any,
}

type httpRequestType = {
    url: string,
    headers?:any,
    data: any,
    method: string
}

export const getBookingsRequest = async ({url, headers={}}: getRequestType) => {

    try{

        const response = await bookingInstance.get(url, {
            headers,
        });
    
        return response.data.data;
    }
    catch(err: any){
        throw new Error(err.response.data.message || "Something went wrong!");
    }
}

export const httpBookingsRequest = async ({url, data, headers={}, method}: httpRequestType) => {
    try{

        const response = await bookingInstance(url, {
            method,
            headers,
            data,
        });

        return response.data.data;

    }
    catch(err: any){
        throw new Error(err.response.data.message || "Something went wrong!");
    }
}

export default bookingInstance;