import { createStore } from "redux";

const initialState = {
  counter: 0,
  showTrue: true,
};

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
