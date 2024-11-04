import { createSlice } from "@reduxjs/toolkit";

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

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;
