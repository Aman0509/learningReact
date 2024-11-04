// Applying redux flow

const redux = require("redux");

// reducer function
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

// create 'store' (ignore the deprecation warning)
// this store manages the data and reducer functions changes the state of data manages by store
const store = redux.createStore(counterReducer);

// You can consider this code which required state (in react equivalent, consider it as a component)
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// Creating store subscription for all required components
store.subscribe(counterSubscriber);

// dispatching actions
console.log(store.getState()); // { counter: 0 }

store.dispatch({
  type: "increment",
}); // { counter: 1 }

store.dispatch({
  type: "decrement",
}); // { counter: 0 }
