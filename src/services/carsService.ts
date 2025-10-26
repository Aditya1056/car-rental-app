import axios, {AxiosInstance} from "axios";
import MockAdapter from 'axios-mock-adapter';

import data from '../mocks/cars.json';

const carInstance: AxiosInstance = axios.create();

const mock = new MockAdapter(carInstance, { delayResponse: 400 });

mock.onGet('/cars').reply(async () => {

    try{
        return [200, { success: true, data }];
    }
    catch(err){
        throw err;
    }
});


mock.onGet('/car').reply(async (config) => {

    try{

        const match = config.url?.match(/\/car\/([^/]+)$/);

        const id = match ? match[1] : null;

        const car = data.find((carData) => {
            return carData.id.toString() === id?.toString();
        });

        return [200, { success: true, data: car }];
    }
    catch(err){
        throw err;
    }
});

export default carInstance;