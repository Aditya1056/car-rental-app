import axios, {AxiosInstance} from "axios";

import { apiUrl } from '../config/index';

const externalInstance: AxiosInstance = axios.create({
    baseURL: apiUrl + '/externals',
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

export const getExternalRequest = async ({url, headers={}}: getRequestType) => {

    try{

        const response = await externalInstance.get(url, {
            headers,
        });
    
        return response.data.data;
    }
    catch(err: any){
        throw new Error(err.response.data.message || "Something went wrong!");
    }
}

export const httpExternalRequest = async ({url, data, headers={}, method}: httpRequestType) => {
    try{

        const response = await externalInstance(url, {
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

export default externalInstance;