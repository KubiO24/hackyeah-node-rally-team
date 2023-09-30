import { useState } from "react";
import styles from "../../styles/Pages.module.css";
import getSubstitutions from "../../utils/getSubstitutions";
import analyzeIngredients from "../../utils/analyzeIngredients";

export default function Index({ navigateToPage }) {
    const [response, setResponse] = useState("");
    const [healthStatus, setHealthStatus] = useState(0);
    const [substitutions, setSubstitutions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [recipe, setRecipe] = useState("");
    const [nutrition, setNutrition] = useState({});

    const SIZE = 100;
    const STROKE_WIDTH = 10;
    const RADIUS = SIZE / 2 - STROKE_WIDTH / 2;
    const circumference = 2 * Math.PI * RADIUS;
    const offset = circumference - (healthStatus / 100) * circumference;
    const getColor = () => {
        if (healthStatus < 50) return "red";
        if (healthStatus < 75) return "orange";
        return "green";
    };

    const analyzeIngredientsTest = () => {
        console.log("analyzeIngredientsTest");
        const ingredients = [
            "1 ½ cups all-purpose flour",
            "3 ½ teaspoons baking powder",
            "1 tablespoon white sugar",
            "¼ teaspoon salt, or more to taste",
            "1 ¼ cups milk",
            "3 tablespoons butter, melted",
            "1 egg",
        ];

        const data = analyzeIngredients(ingredients);
        console.log(data);
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

        chrome.runtime.sendMessage({ type: "getRecipeData" }, async (recipeData) => {
            let recipe = recipeData.title + " ingredients: " + JSON.stringify(recipeData.ingredients);

            setRecipe(recipeData.ingredients);

            // const ingredientsNutrition = await analyzeIngredients(recipeData.ingredients, userObject);
            // setNutrition(ingredientsNutrition);

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
                <p>{JSON.stringify(nutrition, null, 5)}</p>
                <button onClick={handleClick}>click</button>
                <p>Loading: {JSON.stringify(loading)}</p>
                <p>Error: {JSON.stringify(error)}</p>
                {response && (
                    <>
                        <h1>Health status:</h1>
                        <div style={{ width: 100, height: 100, position: "relative" }}>
                            <span className={styles.healthStatus}>{healthStatus}%</span>
                            <svg width={SIZE} height={SIZE}>
                                <circle
                                    stroke="#eee"
                                    strokeWidth={STROKE_WIDTH}
                                    fill="transparent"
                                    r={RADIUS}
                                    cx={SIZE / 2}
                                    cy={SIZE / 2}
                                />
                                <circle
                                    stroke={getColor()}
                                    strokeWidth={STROKE_WIDTH}
                                    fill="transparent"
                                    strokeLinecap="round"
                                    strokeDasharray={`${circumference} ${circumference}`}
                                    strokeDashoffset={offset}
                                    r={RADIUS}
                                    cx={SIZE / 2}
                                    cy={SIZE / 2}
                                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                                />
                            </svg>
                        </div>
                        {substitutions.map((substitution) => (
                            <div>
                                <p>Ingredient: {substitution.ingredient}</p>
                                <p>substitution: {substitution.substitution}</p>
                                <p>Reason: {substitution.reason}</p>
                            </div>
                        ))}
                        <h1>{response}</h1>
                    </>
                )}
            </main>
        </div>
    );
}
