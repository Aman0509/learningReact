import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://127.0.0.1:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p>Fetching Meals...</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
