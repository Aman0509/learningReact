export default function Tabs({ children, buttons, buttonsContainer = "menu" }) {
  // Alternatively, directly accept a prop with an uppercase letter, for eg. ButtonsContainer, ensuring it's also passed with an uppercase letter when using the component.
  const ButtonsContainer = buttonsContainer;
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
