# Projects (Advanced Redux)

## Starting Project

### Frontend and Backend Interaction for Cart Management

1. **Overview of Frontend Tasks**

   - **Handling Async Code**: Managing side effects within components.
   - **Adding Items to Cart**: The frontend component (e.g., product item component) is responsible for handling actions like adding items to the cart.
   - **Redux State Management**: The `add to cart` action dispatches updates to the Redux store to manage cart state on the frontend.

2. **Current Backend (Firebase) Setup**

   - **Firebase Limitations**:
     - Firebase is used as a simple ("dumb") backend for storing data, with no logic or transformations.
     - It doesn’t support backend logic, like checking if an item is already in the cart or updating item quantities.
   - **Impact of Firebase Limitations**:
     - All logic related to cart management must be handled on the frontend.
     - Firebase only stores the received data; any processing or transformation needs to be done before sending it.

3. **Current Solution with Firebase**

   - **Frontend Responsibility**:
     - All logic for handling cart actions (add/remove/update) remains on the frontend.
     - This includes preparing, transforming, and validating data before sending it to Firebase.
   - **Redux Restriction**:
     - Direct backend calls are not allowed within Redux reducers.
     - Backend requests need to be handled outside of reducers, so another function or location is required to send updates to Firebase after Redux updates.

4. **Alternative Backend Setup**

   - **Enhanced Backend Options**:
     - Using a custom backend (e.g., with Node.js or PHP) would allow server-side logic.
     - With a robust backend, logic like managing cart items or transforming data could be done server-side, reducing the work required on the frontend.
   - **Benefits of a Robust Backend**:
     - The frontend could simply send raw data (e.g., product info) to the backend.
     - The backend would transform this data and send back a structured response for the frontend to store, simplifying frontend code.

### Commit Links

- [Add Project (Boilerplate)](https://github.com/Aman0509/learningReact/pull/19/commits/3f3c6870eef098fbf3e6bc2d2d960fa675e86e3a)
- [Implement Redux (Phase 1)](https://github.com/Aman0509/learningReact/pull/19/commits/dc95f578bbb18adffe83c0b186116878806afb61)
- [Implement Redux (Phase 2)](https://github.com/Aman0509/learningReact/pull/19/commits/46ced97ed5a1008e6ad8db2559469ad08149cf0d)
- [Using `useEffect` with Redux](https://github.com/Aman0509/learningReact/pull/19/commits/c664ba6c1ac2f3c61c5f1cc8bb5254e0a634d346)
- [Handle HTTP states & Feedback with Redux](https://github.com/Aman0509/learningReact/pull/19/commits/429bd61fb7e86a8ff77798aa386b584c3266a255)
- [Using an Action Creator Thunk](https://github.com/Aman0509/learningReact/pull/19/commits/6023a0b41a1be0d8e5178e4db7c79f23b63b4e69)
- [Getting Started with Fetching Data](https://github.com/Aman0509/learningReact/pull/19/commits/b997bf7ae97f44d6e219d68ee6d6d2408355ee3e)
- [Finalize Fetch Logic](https://github.com/Aman0509/learningReact/pull/19/commits/87a21f704dfe4974a4c3ff53b09932b5a82eb22a)
