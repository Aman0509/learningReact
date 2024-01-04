export default function CustomInput({ children, ...props }) {
  return (
    <p>
      <label>{children}</label>
      <input {...props} />
    </p>
  );
}
