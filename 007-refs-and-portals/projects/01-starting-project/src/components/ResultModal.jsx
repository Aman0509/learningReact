import { forwardRef } from "react";

// Wrapping a component function with `forwardRef` will results in receiving
// another parameter called `ref` which contains the ref pass into the component
// while calling this component function
const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  return (
    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;

/* Learn about <dialog> HTML elements from here - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog */
