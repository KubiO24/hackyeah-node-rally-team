import { useState } from "react";
import styles from "../../styles/Pages.module.css";
import getSubstitutions from "../../utils/getSubstitutions";

export default function Index({ navigateToPage }) {
  const [response, setResponse] = useState("");
  const [healthStatus, setHealthStatus] = useState(0);
  const [substitutions, setSubstitutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setError(false);
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

        if (!substitutions) {
          setError(true);
          setLoading(false);
          return;
        }

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
        <p>Loading: {JSON.stringify(loading)}</p>
        <p>Error: {JSON.stringify(error)}</p>
        <h1>Health status: {healthStatus}%</h1>
        {substitutions.map((substitution) => (
          <div>
            <p>Ingredient: {substitution.ingredient}</p>
            <p>substitution: {substitution.substitution}</p>
            <p>Reason: {substitution.reason}</p>
          </div>
        ))}
        <h1>{response}</h1>
        <p onClick={() => navigateToPage("new")}>{"Go to New Page >"}</p>
      </main>
    </div>
  );
}
