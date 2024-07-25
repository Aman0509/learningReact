import { useState, useEffect } from "react";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://127.0.0.1:3000/meals");
      if (!response.ok) {
        // ...
      }
      const meals = await response.json();
      setLoadedMeals(meals);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meals) => (
        <li id={meals.id}>{meals.name}</li>
      ))}
    </ul>
  );
}
