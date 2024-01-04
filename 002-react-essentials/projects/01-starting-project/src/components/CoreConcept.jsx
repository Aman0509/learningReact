// Add CoreConcept Component
export default function CoreConcept(props) {
  // alternatively, object destructuring can also be employed,for eg., `function CoreConcept ({image, title, description})`
  return (
    <li>
      <img src={props.image} alt={props.description} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}
