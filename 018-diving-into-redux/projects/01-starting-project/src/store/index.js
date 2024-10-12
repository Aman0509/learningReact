import { createStore } from "redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
  showTrue: true,
};

createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment(state) {
      state.counter++; // here, we are mutating the state which we mentioned earlier not to do. However, redux toolkit uses `Immer` in background and maintain the required state immutability expected by redux
    },
    decrease(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.amount;
    },
    toggleCounter(state) {
      state.showTrue = !state.showTrue;
    },
  },
});

const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return { counter: state.counter + 1, showTrue: state.showTrue };
  }
  if (action.type === "increase") {
    return { counter: state.counter + action.amount, showTrue: state.showTrue };
  }
  if (action.type === "decrement") {
    return { counter: state.counter - 1, showTrue: state.showTrue };
  }
  if (action.type === "toggle") {
    return {
      counter: state.counter,
      showTrue: !state.showTrue,
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
