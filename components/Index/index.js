import { useState } from "react";
import styles from "../../styles/Pages.module.css";
import getSubstitutions from "../../utils/getSubstitutions";

export default function Index({ navigateToPage }) {
  const [response, setResponse] = useState("");
  const [healthStatus, setHealthStatus] = useState(0);
  const [substitutions, setSubstitutions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
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

    chrome.runtime.sendMessage(
      { type: "getRecipeData" },
      async (recipeData) => {
        let recipe =
          recipeData.title +
          " ingredients: " +
          JSON.stringify(recipeData.ingredients);

        let substitutions = await getSubstitutions(recipe);

        setResponse(JSON.stringify(substitutions));
        setHealthStatus(substitutions.healthProcent);
        setSubstitutions(substitutions.list);

        setLoading(false);
      }
    );
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button onClick={handleClick}>click</button>
        <p>{response}</p>
        <p>Loading: {loading}</p>
        <h1>Health status: {healthStatus}%</h1>
        {substitutions.map((substitution) => (
          <div>
            <p>Ingredient: {substitution.ingredient}</p>
            <p>substitution: {substitution.substitution}</p>
            <p>Reason: {substitution.reason}</p>
          </div>
        ))}
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
