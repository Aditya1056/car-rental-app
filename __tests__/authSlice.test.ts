import reducer from "../src/store/slices/authSlice";
import { fetchUser, login, logout, signUp } from "../src/store/thunks/authThunks";

describe('authSlice', () => {

    const initialState = {
        user: null,
        loading: true,
        loggedIn: false,
        error: null
    };

    test('fetchUser.pending sets loading true and loggedIn false', () => {
        const action = { type: fetchUser.pending.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(true);
        expect(nextState.user).toBeNull();
        expect(nextState.error).toBeNull();
        expect(nextState.loggedIn).toBe(false);
    });

    test('fetchUser.fulfilled sets loading false, user and loggedIn true', () => {
        const user = { "id": 1, "name": "Aditya", "email": "aditya@gmail.com" };
        const action = { type: fetchUser.fulfilled.type, payload: user };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.user).toBe(user);
        expect(nextState.loggedIn).toBe(true);
    });

    test('fetchUser.rejected sets loading false, user null and loggedIn false', () => {
        const action = { type: fetchUser.rejected.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(false);
        expect(nextState.user).toBeNull();
        expect(nextState.loggedIn).toBe(false);
    });


    test('login.pending sets loading true and user null', () => {
        const action = { type: login.pending.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(true);
        expect(nextState.user).toBeNull();
        expect(nextState.loggedIn).toBe(false);
    });

    test('login.fulfilled sets user and loggedIn true', () => {
        const user = { "id": 1, "name": "Aditya", "email": "aditya@gmail.com" };
        const action = { type: login.fulfilled.type, payload: user };
        const nextState = reducer(initialState, action);

        expect(nextState.user).toEqual(user);
        expect(nextState.loggedIn).toBe(true);
    });

    test('login.rejected sets error and resets user', () => {
        const action = { type: login.rejected.type, payload: 'Invalid credentials' };
        const nextState = reducer(initialState, action);

        expect(nextState.error).toBe('Invalid credentials');
        expect(nextState.user).toBeNull();
        expect(nextState.loggedIn).toBe(false);
    });

    test('signUp.pending sets loading true', () => {
        const action = { type: signUp.pending.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(true);
    });

    test('signUp.fulfilled sets user and loggedIn true', () => {
        const newUser = { "id": 1, "name": "test", "email": "test@gmail.com" };
        const action = { type: signUp.fulfilled.type, payload: newUser };
        const nextState = reducer(initialState, action);

        expect(nextState.user).toEqual(newUser);
        expect(nextState.loggedIn).toBe(true);
    });

    test('signUp.rejected resets user and loggedIn false', () => {
        const action = { type: signUp.rejected.type };
        const nextState = reducer(initialState, action);

        expect(nextState.user).toBeNull();
        expect(nextState.loggedIn).toBe(false);
    });

    test('logout.pending resets state with loading true', () => {
        const action = { type: logout.pending.type };
        const nextState = reducer(initialState, action);

        expect(nextState.loading).toBe(true);
        expect(nextState.loggedIn).toBe(false);
        expect(nextState.user).toBeNull();
    });

    test('logout.fulfilled resets user and loggedIn false', () => {
        const prevState = { 
            ...initialState, 
            user: { 
                id: 1, 
                name: 'test', 
                email:'test@gmail.com' 
            }, 
            loggedIn: true, 
            loading: false 
        };
        
        const action = { type: logout.fulfilled.type };
        const nextState = reducer(prevState, action);
        
        expect(nextState.user).toBeNull();
        expect(nextState.loggedIn).toBe(false);
        expect(nextState.loading).toBe(false);
    });
});