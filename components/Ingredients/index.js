import { useState } from "react";
import styles from "../../styles/Pages.module.css";
import getSubstitutions from "../../utils/getSubstitutions";
import analyzeIngredients from "../../utils/analyzeIngredients";

export default function Index({
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

        chrome.runtime.sendMessage({ type: "getRecipeData" }, async (recipeData) => {
            let recipe = recipeData.title + " ingredients: " + JSON.stringify(recipeData.ingredients);

            const data = await analyzeIngredients(recipeData.ingredients);
            setIngredientsNutrition(data);
            setSubstitutionsNutrition(data);
            setRecipe(recipeData.ingredients);

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
        });
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <button onClick={() => analyzeIngredientsTest()}>Analyze ingredients</button>
                <p>Recipe:</p>
                <p>{recipe}</p>
                <p>Nutrition:</p>
                <p>{JSON.stringify(ingredientsNutrition, null, 5)}</p>
                <p>Substitution nutrition: </p>
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
                    </div>
                ))}
                <h1>{response}</h1>
                <p onClick={() => navigateToPage("new")}>{"Go to New Page >"}</p>
            </main>
        </div>
    );
}
