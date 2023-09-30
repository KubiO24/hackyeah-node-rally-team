import styles from "./Trening.module.css";
import React, { useState, useEffect } from "react";
import getWorkoutPlan from "../../utils/getWorkoutPlan";
import getCaloriesBurned from "../../utils/getCaloriesBurned";

export default function Trening() {
  const [activity, setActivity] = useState({});
  const [meal, setMeal] = useState({});

  useEffect(() => {
    const tempMeal = localStorage.getItem("meal") || {
      kcal: 820,
      carbs: 100,
      sugar: 20,
      proteins: 20,
      fat: 20,
    };
    const tempActivity = localStorage.getItem("activity") || {
      kcal: 704,
      name: "Swimmer",
    };

    console.log(handleGetWorkoutPlan(tempMeal, tempActivity));
    console.log(handleGetCaloriesBurned(tempMeal, tempActivity));

    setMeal(tempMeal);
    setActivity(tempActivity);
  }, []);

  const handleGetWorkoutPlan = async (meal, activity) => {
    const workoutPlan = await getWorkoutPlan(
      { sex: "male", weight: 82, height: 182, ...activity },
      meal
    );
    return workoutPlan;
  };
  const handleGetCaloriesBurned = (meal, activity) => {
    const caloriesBurned = getCaloriesBurned(
      { sex: "male", weight: 82, height: 182, ...activity },
      meal
    );
    return caloriesBurned;
  };

  return (
    <div className={styles.container}>
      <h1>Trening proposition</h1>
      <p>Prefered activity: {activity.name}</p>
      <article>
        Your meal contained of {meal.kcal} kcal. Best activities for you are: {}
      </article>
    </div>
  );
}
