import CustomInput from "./CustomInput.jsx";

export default function UserInput() {
  return (
    <section id="user-input">
      <div className="input-group">
        <CustomInput type="number">Initial Investment</CustomInput>
        <CustomInput type="number">Annual Investment</CustomInput>
      </div>
      <div className="input-group">
        <CustomInput type="number">Expected Return</CustomInput>
        <CustomInput type="number">Duration</CustomInput>
      </div>
    </section>
  );
}
