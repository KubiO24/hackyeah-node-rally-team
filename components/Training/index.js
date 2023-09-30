import styles from "./Trening.module.css";
import React, { useState, useEffect } from "react";
import getWorkoutPlan from "../../utils/getWorkoutPlan";
import getCaloriesBurned from "../../utils/getCaloriesBurned";
import Loader from "../Loader";

export default function Trening() {
  const [activity, setActivity] = useState({});
  const [meal, setMeal] = useState({});

  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [caloriesBurned, setCaloriesBurned] = useState([]);

  useEffect(() => {
    const tempMeal = localStorage.getItem("meal") || {
      kcal: 820,
      carbs: 100,
      sugar: 20,
      proteins: 20,
      fat: 20,
    };
    const tempActivity = JSON.parse(localStorage.getItem("activity")) || {
      kcal: 600,
      name: "Waight lifting",
    };
    handleGetCaloriesBurned(tempMeal, tempActivity);
    handleGetWorkoutPlan(tempMeal, tempActivity);

    setMeal(tempMeal);
    setActivity(tempActivity);
  }, []);

  const handleGetWorkoutPlan = async (meal, activity) => {
    const workoutPlan = await getWorkoutPlan(
      {
        sex: "male",
        weight: 82,
        height: 182,
        goal: "Gaining muscle",
        activity,
      },
      meal
    );
    setWorkoutPlan(workoutPlan);
  };
  const handleGetCaloriesBurned = (meal, activity) => {
    const caloriesBurned = getCaloriesBurned(
      { sex: "male", weight: 82, height: 182, activity },
      meal
    );
    console.log(caloriesBurned);
    setCaloriesBurned(caloriesBurned);
  };

  return (
    <div className={styles.container}>
      <h1>Trening proposition</h1>
      <p>Prefered activity: {activity.name}</p>
      <article>
        <h3>Your meal containes of {meal.kcal}. To burn that you have to: </h3>
        <ul>
          {caloriesBurned.map((activity, idx) => (
            <li key={idx}>
              {activity.name} for {activity.time} minutes
            </li>
          ))}
        </ul>
        <h3>Here are our traing plans for you based on your prefferences: </h3>
        {!!workoutPlan ? (
          <ol>
            {workoutPlan.map((workout, idx) => (
              <li key={idx}>
                <h3>{workout.title}</h3>
                <p>{workout.description}</p>
                <ul>
                  {workout.exercises.map((excersise, idx) => (
                    <li key={idx}>
                      {excersise.name} - {excersise.duration} -{" "}
                      {excersise.burnedCalories} kcal
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        ) : (
          <Loader />
        )}
      </article>
    </div>
  );
}
