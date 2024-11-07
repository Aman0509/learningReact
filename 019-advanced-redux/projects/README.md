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
