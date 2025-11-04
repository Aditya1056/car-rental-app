import reducer from "../src/store/slices/carSlice";
import { getAllCars, getCarById } from "../src/store/thunks/carThunks";

describe('carSlice', () => {

    const initialState = {
        loading: true,
        cars: [],
        car: null,
        error: null,
        singleCarError: null,
    };

    test('getAllCars.pending sets loading true', () => {
        const action = { type: getAllCars.pending.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(true);
        expect(nextState.cars).toBe([]);
        expect(nextState.error).toBeNull();
    });

    test('getAllCars.fulfilled sets loading false and set cars', () => {
        const cars = [{
            "id": 3,
            "make": "Tata Motors",
            "model": "Nexon",
            "description": "",
            "year": 2023,
            "topSpeed": 100,
            "pricePerDay": 45,
            "images": [
            "https://res.cloudinary.com/dhbdon75r/image/upload/v1762151344/nexon-1_ajjxj5.png",
            "https://res.cloudinary.com/dhbdon75r/image/upload/v1762151346/nexon-2_gqd8pp.png",
            "https://res.cloudinary.com/dhbdon75r/image/upload/v1762151352/nexon-3_ne02qk.png"
            ],
            "seats": 5,
            "transmission": "Manual"
        }];

        const action = { type: getAllCars.fulfilled.type, payload: cars };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.cars).toBe(cars);
    });

    test('getAllCars.rejected sets loading false', () => {
        const action = { type: getAllCars.rejected.type, payload: 'Invalid data' };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe('Invalid data');
    });


    test('getCarById.pending sets loading true and car null', () => {
        const action = { type: getCarById.pending.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(true);
        expect(nextState.car).toBeNull();
    });

    test('getCarById.fulfilled sets loading false and car', () => {
        const car = {
            "id": 3,
            "make": "Tata Motors",
            "model": "Nexon",
            "description": "",
            "year": 2023,
            "topSpeed": 100,
            "pricePerDay": 45,
            "images": [
            "https://res.cloudinary.com/dhbdon75r/image/upload/v1762151344/nexon-1_ajjxj5.png",
            "https://res.cloudinary.com/dhbdon75r/image/upload/v1762151346/nexon-2_gqd8pp.png",
            "https://res.cloudinary.com/dhbdon75r/image/upload/v1762151352/nexon-3_ne02qk.png"
            ],
            "seats": 5,
            "transmission": "Manual"
        };

        const action = { type: getCarById.fulfilled.type, payload: car };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.car).toEqual(car);
    });

    test('getCarById.rejected sets error', () => {
        const action = { type: getCarById.rejected.type, payload: 'Invalid credentials' };
        const nextState = reducer(initialState, action);

        expect(nextState.singleCarError).toBe('Invalid credentials');
    });
});