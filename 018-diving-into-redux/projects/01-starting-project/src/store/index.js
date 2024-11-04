import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";

const store = configureStore({
  // reducer: counterSlice.reducer, // since we only have one state slice, we can do like this.
  reducer: {
    // in case of multiple slices, we have to go with this approach
    counter: counterReducer,
    auth: authReducer,
  },
});

export default store;
