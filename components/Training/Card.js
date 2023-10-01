import React, { useState } from "react";
import styles from "./Trening.module.css";

export default function Card({ workout, idx }) {
  const [colapse, setColapse] = useState(true);

  return (
    <>
      {colapse ? (
        <li onClick={() => setColapse(!colapse)} className={styles.section}>
          <div className={styles.nav}>
            <h3 className={styles.h3}>
              {idx + 1}. {workout.title}
            </h3>
            <img src="/icons/chevron-left.svg" />
          </div>
        </li>
      ) : (
        <li onClick={() => setColapse(!colapse)} className={styles.section}>
          <div className={styles.nav}>
            <h3 className={styles.h3}>
              {idx + 1}. {workout.title}
            </h3>
            <img src="/icons/chevron-down.svg" />
          </div>
          <p className={styles.description}>{workout.description}</p>
          <ul>
            {workout.exercises.map((excersise, idx) => (
              <li key={idx}>
                {excersise.name} - {excersise.duration} -{" "}
                {excersise.burnedCalories} kcal
              </li>
            ))}
          </ul>
          <div style={{ height: 10 }} />
        </li>
      )}
    </>
  );
}
