import { useState } from "react";
import styles from "../../styles/Pages.module.css";

export default function Index({ navigateToPage }) {
  const [response, setResponse] = useState("");

  const handleClick = () => {
    let weight = localStorage.getItem("weight");
    let height = localStorage.getItem("height");
    let activity = localStorage.getItem("activity");
    let trainingGoal = localStorage.getItem("trainingGoal");
    let sex = localStorage.getItem("sex");
    let foodAllergy = JSON.parse(localStorage.getItem("foodAllergy"));
    let trainingPreference = localStorage.getItem("trainingPreference");
    let isPregnant = localStorage.getItem("isPregnant");

    let userObject = {
      weight,
      height,
      activity,
      trainingGoal,
      sex,
      foodAllergy,
      trainingPreference,
      isPregnant,
    };

    chrome.runtime.sendMessage({ type: "getIngredients" }, (ingredients) => {
      setResponse(ingredients);
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button onClick={handleClick}>click</button>
        <p>{response}</p>
        <h1 className={styles.title}>NEXT-CHROME-STARTER</h1>
        <p className={styles.description}>
          This is an example of a Browser Extension built with NEXT.JS. Please
          refer to the GitHub repo for running instructions and documentation
        </p>
        <h1 className={styles.code}>Index Page ./components/Index/index.js</h1>
        <p>{"[ - This is Index page content - ]"}</p>
        <p onClick={() => navigateToPage("new")}>{"Go to New Page >"}</p>
      </main>
    </div>
  );
}
