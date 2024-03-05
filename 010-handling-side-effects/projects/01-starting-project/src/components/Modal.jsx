import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// We switch from managing the modal in an imperative way to managing it in a declarative way
function Modal({ open, onClose, children }) {
  const dialog = useRef();

  // If `useEffect` is not used and only inside logic would have used (`if else` one), then it would break
  // because, initially, the value of `open` prop would be false, so, according to the condition,
  // it would try to close the modal. But problem here is that, we are using `dialog` ref, attached
  // with the modal JSX code to open and close it. Since, for the very time, when this `dialog` ref
  // will be used, JSX code attached to it will not be render and it's value will be undefined, hence
  // resulting to error. Hence, `useEffect` comes in picture.
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
