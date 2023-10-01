import styles from "./Trening.module.css";
import React, { useState, useEffect } from "react";
import getWorkoutPlan from "../../utils/getWorkoutPlan";
import getCaloriesBurned from "../../utils/getCaloriesBurned";
import Loader from "../Loader";
import Card from "./Card";

export default function Trening({ ingredientsNutrition, navigateToPage }) {
  const [activity, setActivity] = useState({});
  const [meal, setMeal] = useState({});

  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [caloriesBurned, setCaloriesBurned] = useState([]);

  useEffect(() => {
    const tempMeal = {
      kcal: ingredientsNutrition.calories,
      carbs: ingredientsNutrition.totalDaily.CHOCDF.quantity,
      proteins: ingredientsNutrition.totalDaily.PROCNT.quantity,
      fat: ingredientsNutrition.totalDaily.FAT.quantity,
    };
    const tempActivity = JSON.parse(localStorage.getItem("activity")) || {
      kcal: 600,
      name: "Waight lifting",
    };

    const thisPerson = {
      activity: tempActivity,
      sex: localStorage.getItem("sex"),
      weight: localStorage.getItem("weight"),
      height: localStorage.getItem("height"),
    };
    handleGetCaloriesBurned(tempMeal, thisPerson);
    handleGetWorkoutPlan(tempMeal, thisPerson);

    setMeal(tempMeal);
    setActivity(tempActivity);
  }, []);

  const handleGetWorkoutPlan = async (meal, thisPerson) => {
    const workoutPlan = await getWorkoutPlan(thisPerson, meal);
    setWorkoutPlan(workoutPlan);
  };
  const handleGetCaloriesBurned = (meal, thisPerson) => {
    const caloriesBurned = getCaloriesBurned(thisPerson, meal);
    console.log(caloriesBurned);
    setCaloriesBurned(caloriesBurned);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Training suggestion</h1>
      <p style={{ fontSize: "1.3em" }}>Prefered activity: {activity.name}</p>
      <article>
        <h3>
          Your meal containes of {meal.kcal} kcal, to burn that you have to:{" "}
        </h3>
        <ul className={styles.l} style={{ marginLeft: 20 }}>
          {caloriesBurned.map((activity, idx) => (
            <li key={idx}>
              {activity.name} for {activity.time} minutes
            </li>
          ))}
        </ul>
        <h3>Here are our traing plans for you based on your prefferences: </h3>
        {workoutPlan.length ? (
          <ol className={styles.l} style={{ padding: 0 }}>
            {workoutPlan.map((workout, idx) => (
              <Card key={idx} idx={idx} workout={workout} />
            ))}
          </ol>
        ) : (
          <Loader />
        )}
      </article>
    </div>
  );
}
