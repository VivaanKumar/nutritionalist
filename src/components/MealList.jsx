import React from "react";
import Meal from "./Meal";

export default function MealList({ mealData }) {
  const nutrients = mealData.nutrients;

  return (
    <main>
      <div className="suggestion newRoundedEdge1"><i className="fa fa-thumb-tack"></i> <p>These suggestions are as maximised as possible. Depending on your calorie request, we give you a full 3-meal-aday' generated menu. With all nutritional values into consideration.</p> </div>
      <section className="nutrientsChart newRoundedEdge1">
        <h1>Macros</h1>
        <ul>
          <li>Calories: {nutrients.calories.toFixed(0)}</li>
          <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
          <li>Fat: {nutrients.fat.toFixed(0)}</li>
          <li>Protein: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section className="meals">
        {mealData.meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section>
    </main>
  );
}
