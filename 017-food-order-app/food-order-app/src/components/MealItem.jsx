import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Buttons.jsx";

export default function MealItem({ meal }) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://127.0.0.1:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button textOnly>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
