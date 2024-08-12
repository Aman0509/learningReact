import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Buttons.jsx";
import { currencyFormatter } from "../util/formatting.js";

import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalPrice = cartCtx.items.reduce(
    (totPrice, item) => totPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    // Note: For validation, we just want all fields required which is already handled in `Input` component
    event.preventDefault();
    const customerData = Object.fromEntries(new FormData(event.target));
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
        <Input id="full-name" type="text" label="Full Name" />
        <Input id="email" type="email" label="E-Mail Address" />
        <Input id="street" type="text" label="Street" />
        <div className="control-row">
          <Input id="postal-code" type="text" label="Postal Code" />
          <Input id="city" type="text" label="City" />
        </div>
        <p className="modal-actions">
          <Button type="button" onClick={handleClose} textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
