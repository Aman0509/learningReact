import { useState } from "react";

export default function Login() {
  // In below approach, we are tracking state for each form field, however, imagine if we have
  // numerous fields, we have to maintain multiple state which is not good solution.
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");
  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }
  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }
  const isInvalidEmail =
    enteredValues.email !== "" && !enteredValues.email.includes("@");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted!");
    console.log(enteredValues);

    // resetting programmatically
    //   setEnteredValues({
    //     email: "",
    //     password: "",
    //   });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={enteredValues.email}
            onChange={(event) => {
              handleInputChange("email", event.target.value);
            }}
          />
          <div className="control-error">
            {isInvalidEmail && <p>Please enter valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={enteredValues.password}
            onChange={(event) => {
              handleInputChange("password", event.target.value);
            }}
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
