export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // Demonstrate another case which can be handled with useEffect()
  // introducing feature where this modal closes automatically after three seconds
  // and automatically delete the place card. Basically, automatically confirming this modal after 3 secs

  // now, this is a side effect
  // this side effect needs to be handled with `useEffect`
  // in order to clear the timer (if not, we will see unexpected behaviors)
  setTimeout(() => {
    onConfirm();
  }, 3000);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
