import { useEffect, useState } from "react";
import styles from "../../styles/Pages.module.css";
import getSubstitutions from "../../utils/getSubstitutions";
import analyzeIngredients from "../../utils/analyzeIngredients";

const MOCK_INGREDIENTS = [
  "1 ½ pounds lean ground beef",
  "½ onion, finely chopped",
  "½ cup shredded Colby Jack or Cheddar cheese",
  "1 egg",
  "1 (1 ounce) envelope dry onion soup mix",
  "1 clove garlic, minced",
  "1 tablespoon garlic powder",
  "1 teaspoon soy sauce",
  "1 teaspoon Worcestershire sauce",
  "1 teaspoon dried parsley",
  "1 teaspoon dried basil",
  "1 teaspoon dried oregano",
  "½ teaspoon crushed dried rosemary",
  "salt and pepper to taste",
];

export default function Substitution({
  navigateToPage,
  setIngredientsNutrition,
  ingredientsNutrition,
  substitutionsNutrition,
  setSubstitutionsNutrition,
}) {
  const [response, setResponse] = useState("");
  const [healthStatus, setHealthStatus] = useState(0);
  const [substitutions, setSubstitutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [recipeSubstitute, setRecipeSubstitute] = useState([]);

  useEffect(() => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", substitutionsNutrition);
  }, [substitutionsNutrition]);

  const testAnalyze = async () => {
    let recipe =
      "Best Hamburger Ever" +
      " ingredients: " +
      JSON.stringify(MOCK_INGREDIENTS);

    const analyzedIngredients = await analyzeIngredients(MOCK_INGREDIENTS);
    setIngredientsNutrition(analyzedIngredients);

    console.log(analyzedIngredients);

    const substitutions = await getSubstitutions(recipe);
    console.log("TEST SUBSTITUTIONS ", substitutions);
    let substitutesList = substitutions.list;
    let recipeWithSubstitutions = [];

    MOCK_INGREDIENTS.forEach((ingredient) => {
      let substituteFound = false;
      substitutesList.forEach((substitute) => {
        if (ingredient.includes(substitute.ingredient)) {
          recipeWithSubstitutions.push(
            `${substitute.quantity} ${substitute.substitution}`
          );
          substituteFound = true;
        }
      });

      if (!substituteFound) recipeWithSubstitutions.push(ingredient);
    });

    const analyzedSubstitutions = await analyzeIngredients(
      recipeWithSubstitutions
    );
    setSubstitutionsNutrition(analyzedSubstitutions);
    setRecipeSubstitute(recipeWithSubstitutions);

    setRecipe(MOCK_INGREDIENTS);
  };

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

        //NUTRITION FOR ORIGINAL RECIPE
        const analyzedIngredients = await analyzeIngredients(
          recipeData.ingredients
        );
        setIngredientsNutrition(analyzedIngredients);
        //

        let substitutions = await getSubstitutions(recipe);

        if (!substitutions) {
          setError(true);
          setLoading(false);
          return;
        }

        setResponse(JSON.stringify(substitutions));
        setHealthStatus(substitutions.healthProcent);
        setSubstitutions(substitutions.list);

        //NUTRITION FOR SUBSTITUED RECIPE
        let substitutesList = substitutions.list;
        let recipeWithSubstitutions = [];

        MOCK_INGREDIENTS.forEach((ingredient) => {
          let substituteFound = false;
          substitutesList.forEach((substitute) => {
            if (ingredient.includes(substitute.ingredient)) {
              recipeWithSubstitutions.push(
                `${substitute.quantity} ${substitute.substitution}`
              );
              substituteFound = true;
            }
          });

          if (!substituteFound) recipeWithSubstitutions.push(ingredient);
        });

        const analyzedSubstitutions = await analyzeIngredients(
          recipeWithSubstitutions
        );
        setSubstitutionsNutrition(analyzedSubstitutions);
        setRecipeSubstitute(recipeWithSubstitutions);
        console.log("ANALYZED SUBSTITUTIONS", recipeWithSubstitutions);
        //
        setRecipe(recipeData.ingredients);

        setLoading(false);
      }
    );
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button onClick={() => testAnalyze()}>Analyze ingredients</button>
        <p>Recipe:</p>
        <p>{recipe}</p>
        <p>Nutrition:</p>
        <p>{JSON.stringify(ingredientsNutrition, null, 5)}</p>
        <p>Substitution recipe:</p>
        <p>{recipeSubstitute}</p>
        <p>Substitutions Nutrition:</p>
        <p>{JSON.stringify(substitutionsNutrition, null, 5)}</p>
        <button onClick={handleClick}>click</button>
        <p>Loading: {JSON.stringify(loading)}</p>
        <p>Error: {JSON.stringify(error)}</p>
        <h1>Health status: {healthStatus}%</h1>
        {substitutions.map((substitution) => (
          <div>
            <p>Ingredient: {substitution.ingredient}</p>
            <p>substitution: {substitution.substitution}</p>
            <p>Reason: {substitution.reason}</p>
            <p>Quantity: {substitution.quantity}</p>
          </div>
        ))}
        <h1>{response}</h1>
        <h2>
          {JSON.stringify(
            substitutions.map((s) => s.quantity + " " + s.substitution)
          )}
        </h2>
        <h2>
          {JSON.stringify(
            substitutions.map((s) => s.quantity + " " + s.ingredient)
          )}
        </h2>
        <p onClick={() => navigateToPage("new")}>{"Go to New Page >"}</p>
      </main>
    </div>
  );
}
