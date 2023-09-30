import styles from "./Trening.module.css";
import React, { useState, useEffect } from "react";
import getWorkoutPlan from "../../utils/getWorkoutPlan";

export default function Trening() {
  const [activity, setActivity] = useState({});
  const [meal, setMeal] = useState({});

  useEffect(() => {
    setActivity(
      localStorage.getItem("activity") || {
        kcal: 704,
        name: "Swimmer",
      }
    );

    console.log(handleGetWorkoutPlan());

    setMeal({ kcal: 800 });
  }, []);

  const handleGetWorkoutPlan = async () => {
    const workoutPlan = await getWorkoutPlan(
      { sex: "male", weight: 82, height: 182, activity },
      { kcal: 820, carbs: 100, sugar: 20, proteins: 20, fat: 20 }
    );
    return workoutPlan;
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
