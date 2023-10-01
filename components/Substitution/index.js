import { useEffect, useState } from "react";
import styles from "../../styles/Pages.module.css";
import getSubstitutions from "../../utils/getSubstitutions";
import analyzeIngredients from "../../utils/analyzeIngredients";
import substitutionsStyle from "./styles.module.css";

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

    const SIZE = 100;
    const STROKE_WIDTH = 10;
    const RADIUS = SIZE / 2 - STROKE_WIDTH / 2;
    const circumference = 2 * Math.PI * RADIUS;
    const offset = circumference - (healthStatus / 100) * circumference;
    const getColor = () => {
        if (healthStatus < 50) return "red";
        if (healthStatus < 75) return "orange";
        return "rgb(76, 214, 120)";
    };

    useEffect(() => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", substitutionsNutrition);
    }, [substitutionsNutrition]);

    const testAnalyze = async () => {
        let recipe = "Best Hamburger Ever" + " ingredients: " + JSON.stringify(MOCK_INGREDIENTS);

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
                    recipeWithSubstitutions.push(`${substitute.quantity} ${substitute.substitution}`);
                    substituteFound = true;
                }
            });

            if (!substituteFound) recipeWithSubstitutions.push(ingredient);
        });

        const analyzedSubstitutions = await analyzeIngredients(recipeWithSubstitutions);
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

        chrome.runtime.sendMessage({ type: "getRecipeData" }, async (recipeData) => {
            let recipe = recipeData.title + " ingredients: " + JSON.stringify(recipeData.ingredients);

            //NUTRITION FOR ORIGINAL RECIPE
            const analyzedIngredients = await analyzeIngredients(recipeData.ingredients);
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
                        recipeWithSubstitutions.push(`${substitute.quantity} ${substitute.substitution}`);
                        substituteFound = true;
                    }
                });

                if (!substituteFound) recipeWithSubstitutions.push(ingredient);
            });

            const analyzedSubstitutions = await analyzeIngredients(recipeWithSubstitutions);
            setSubstitutionsNutrition(analyzedSubstitutions);
            setRecipeSubstitute(recipeWithSubstitutions);
            console.log("ANALYZED SUBSTITUTIONS", recipeWithSubstitutions);
            //
            setRecipe(recipeData.ingredients);

            setLoading(false);
        });
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <button onClick={() => testAnalyze()}>Analyze ingredients</button>
                {/* <p>Recipe:</p>
                <p>{recipe}</p>
                <p>Nutrition:</p>
                <p>{JSON.stringify(ingredientsNutrition, null, 5)}</p>
                <p>Substitution recipe:</p>
                <p>{recipeSubstitute}</p>
                <p>Substitutions Nutrition:</p>
                <p>{JSON.stringify(substitutionsNutrition, null, 5)}</p> */}
                <button className={styles.button} onClick={handleClick}>
                    Analyze Recipe
                </button>
                <p>Loading: {JSON.stringify(loading)}</p>
                <p>Error: {JSON.stringify(error)}</p>

                <div>
                    <div>INGREDIENTS NUTRITION</div>
                    <div>{JSON.stringify(ingredientsNutrition, null, 5)}</div>
                    <div>SUBSTITUTION NUTRITION</div>
                    <div>{JSON.stringify(substitutionsNutrition, null, 5)}</div>

                    <div className={styles.sectionTitle}>INGREDIENTS</div>
                    <div className={styles.generalNutrients}>
                        <div className={styles.nutrientLabels}>
                            <div className={styles.nutrientLabel}>TOTAL</div>
                            <div className={styles.nutrientLabel}>DAILY</div>
                        </div>
                        <div className={styles.nutrientName}>
                            {ingredientsNutrition.totalNutrients.ENERC_KCAL.label}
                        </div>
                        <div className={styles.nutrientValues}>
                            <div>{ingredientsNutrition.totalNutrients.ENERC_KCAL.quantity.toFixed(2)}</div>
                            <div>{ingredientsNutrition.totalNutrients.ENERC_KCAL.unit}</div>
                            <div>{ingredientsNutrition.totalDaily.ENERC_KCAL.quantity.toFixed(2)}</div>
                            <div>{ingredientsNutrition.totalDaily.ENERC_KCAL.unit}</div>
                        </div>
                        <div className={styles.nutrientName}>{ingredientsNutrition.totalNutrients.FAT.label}</div>
                        <div className={styles.nutrientValues}>
                            <div>{ingredientsNutrition.totalNutrients.FAT.quantity.toFixed(2)}</div>
                            <div>{ingredientsNutrition.totalNutrients.FAT.unit}</div>
                            <div>{ingredientsNutrition.totalDaily.FAT.quantity.toFixed(2)}</div>
                            <div>{ingredientsNutrition.totalDaily.FAT.unit}</div>
                        </div>
                        <div className={styles.nutrientName}>{ingredientsNutrition.totalNutrients.PROCNT.label}</div>
                        <div className={styles.nutrientValues}>
                            <div>{ingredientsNutrition.totalNutrients.PROCNT.quantity.toFixed(2)}</div>
                            <div>{ingredientsNutrition.totalNutrients.PROCNT.unit}</div>
                            <div>{ingredientsNutrition.totalDaily.PROCNT.quantity.toFixed(2)}</div>
                            <div>{ingredientsNutrition.totalDaily.PROCNT.unit}</div>
                        </div>
                        <div className={styles.nutrientName}>{ingredientsNutrition.totalNutrients.CHOLE.label}</div>
                        <div className={styles.nutrientValues}>
                            <div>{ingredientsNutrition.totalNutrients.CHOLE.quantity.toFixed(2)}</div>
                            <div>{ingredientsNutrition.totalNutrients.CHOLE.unit}</div>
                            <div>{ingredientsNutrition.totalDaily.CHOLE.quantity.toFixed(2)}</div>
                            <div>{ingredientsNutrition.totalDaily.CHOLE.unit}</div>
                        </div>
                    </div>

                    <div className={styles.sectionTitle}>INGREDIENTS</div>
                    {ingredientsNutrition.ingredients.map((ingredientRaw) => {
                        const ingredient = ingredientRaw.parsed[0];

                        return (
                            <div className={styles.ingredientSection}>
                                <div className={styles.ingredientName}>{ingredient.food}</div>
                                <div className={styles.ingredientNutrients}>
                                    <div>{ingredient.nutrients.ENERC_KCAL.label}</div>
                                    <div>{ingredient.nutrients.ENERC_KCAL.quantity.toFixed(2)}</div>
                                    <div>{ingredient.nutrients.ENERC_KCAL.unit}</div>
                                </div>
                                <div className={styles.ingredientNutrients}>
                                    <div>{ingredient.nutrients.FAT.label}</div>
                                    <div>{ingredient.nutrients.FAT.quantity.toFixed(2)}</div>
                                    <div>{ingredient.nutrients.FAT.unit}</div>
                                </div>
                                <div className={styles.ingredientNutrients}>
                                    <div>{ingredient.nutrients.PROCNT.label}</div>
                                    <div>{ingredient.nutrients.PROCNT.quantity.toFixed(2)}</div>
                                    <div>{ingredient.nutrients.PROCNT.unit}</div>
                                </div>
                                <div className={styles.ingredientNutrients}>
                                    <div>{ingredient.nutrients.CHOLE.label}</div>
                                    <div>{ingredient.nutrients.CHOLE.quantity.toFixed(2)}</div>
                                    <div>{ingredient.nutrients.CHOLE.unit}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {response && (
                    <>
                        <span className={styles.healthStatusTitle}>Health status</span>
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
                        <div className={styles.substitutions}>
                            {substitutions.map((substitution) => (
                                <div className={styles.substitution}>
                                    <div>
                                        <span className={styles.before}>{substitution.ingredient}</span>
                                        <img className={styles.arrow} src="/icons/arrow.svg" alt="arrow" />
                                        <span className={styles.after}>{substitution.substitution}</span>
                                    </div>
                                    <span className={styles.reason}>{substitution.reason}</span>
                                </div>
                            ))}
                        </div>
                        <h1>{response}</h1>
                    </>
                )}
                <h1>{response}</h1>
                <h2>{JSON.stringify(substitutions.map((s) => s.quantity + " " + s.substitution))}</h2>
                <h2>{JSON.stringify(substitutions.map((s) => s.quantity + " " + s.ingredient))}</h2>
            </main>
        </div>
    );
}
