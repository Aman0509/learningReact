import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

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

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: true,
    }));
  }

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

  const isInvalidEmail =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  const isInvalidPassword =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          error={isInvalidEmail && "Please enter valid email address"}
          value={enteredValues.email}
          onBlur={() => handleInputBlur("email")}
          onChange={(event) => {
            handleInputChange("email", event.target.value);
          }}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          error={isInvalidPassword && "Please enter a valid password"}
          value={enteredValues.password}
          onChange={(event) => {
            handleInputChange("password", event.target.value);
          }}
          onBlur={(event) => handleInputBlur("password")}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
