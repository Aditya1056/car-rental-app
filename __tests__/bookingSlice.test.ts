import reducer from "../src/store/slices/bookingSlice";
import { getAllBookings } from "../src/store/thunks/bookingThunks";

describe('bookingSlice', () => {

    const initialState = {
        bookings: [],
        loading: true,
    }

    test('getAllBookings.pending sets loading true', () => {
        const action = { type: getAllBookings.pending.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(true);
        expect(nextState.bookings).toBe([]);
    });

    test('getAllBookings.fulfilled sets loading false and set bookings', () => {
        const bookings = [{
            "id": "10",
            "paymentDetails": {},
            "startDate": "",
            "endDate": "",
            "pickupLocation": {},
            "dropOffLocation": {},
        }];

        const action = { type: getAllBookings.fulfilled.type, payload: bookings };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.bookings).toBe(bookings);
    });

    test('getAllBookings.rejected sets loading false', () => {
        const action = { type: getAllBookings.rejected.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(false);
    });
});