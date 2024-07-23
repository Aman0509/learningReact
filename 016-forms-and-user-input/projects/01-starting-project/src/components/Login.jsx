import { useRef, useState } from "react";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted!");
    console.log(emailRef.current.value, passwordRef.current.value);

    const enteredEmail = emailRef.current.value;

    // resetting manually via refs - less recommended
    // emailRef.current.value = '';
    // passwordRef.current.value = '';

    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    console.log("Sending HTTPS Request...");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailRef} />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
