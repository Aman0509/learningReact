import { useState } from "react";
import CustomInput from "./CustomInput.jsx";

export default function UserInput({ handleChange, inputData }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <CustomInput
          type="number"
          value={inputData.initialInvestment}
          onChange={(event) => {
            handleChange("initialInvestment", event.target.value);
          }}
        >
          Initial Investment
        </CustomInput>
        <CustomInput
          type="number"
          value={inputData.annualInvestment}
          onChange={(event) => {
            handleChange("annualInvestment", event.target.value);
          }}
        >
          Annual Investment
        </CustomInput>
      </div>
      <div className="input-group">
        <CustomInput
          type="number"
          value={inputData.expectedReturn}
          onChange={(event) => {
            handleChange("expectedReturn", event.target.value);
          }}
        >
          Expected Return
        </CustomInput>
        <CustomInput
          type="number"
          value={inputData.duration}
          onChange={(event) => {
            handleChange("duration", event.target.value);
          }}
        >
          Duration
        </CustomInput>
      </div>
    </section>
  );
}
