import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialCounterState = {
  counter: 0,
  showTrue: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    // these methods also accept `action` arg, but we can skip accepting it if not used by that method
    increment(state) {
      state.counter++; // here, we are mutating the state which we mentioned earlier not to do. However, redux toolkit uses `Immer` in background and maintain the required state immutability expected by redux
    },
    decrease(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.showTrue = !state.showTrue;
    },
  },
});

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const store = configureStore({
  // reducer: counterSlice.reducer, // since we only have one state slice, we can do like this.
  reducer: {
    // in case of multiple slices, we have to go with this approach
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
