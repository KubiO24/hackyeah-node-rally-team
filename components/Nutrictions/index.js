import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Nutrictions({ ingredientsNutrition, substitutionsNutrition }) {
    const [advancedMode, setAdvancedMode] = useState(false);
    const [dividedIngredientData, setDividedIngredientData] = useState({});
    const [ingredientDataArray, setIngredientDataArray] = useState([]);

    let ingredientData = Object.values(ingredientsNutrition.totalNutrients ?? {});

    useEffect(() => {
        let temp = groupByUnit(ingredientData);

        setDividedIngredientData(temp);
        setIngredientDataArray(extractObjectsToArray(temp));
    }, []);

    function groupByUnit(data) {
        const result = {};

        for (const key in data) {
            const unit = data[key].unit;
            if (!result[unit]) {
                result[unit] = [];
            }

            // Calculate the random substitution quantity between 0.6 and 1.4 times the original quantity
            const originalQuantity = data[key].quantity;
            const minPercentage = 0.6;
            const maxPercentage = 1.4;
            const randomPercentage = Math.random() * (maxPercentage - minPercentage) + minPercentage;
            const substitutionQuantity = originalQuantity * randomPercentage;

            // Add the substitution_quantity property to the item
            data[key].substitution_quantity = substitutionQuantity;

            result[unit].push(data[key]);
        }

        return result;
    }

    function extractObjectsToArray(inputObject) {
        const resultArray = [];

        for (const key in inputObject) {
            if (Array.isArray(inputObject[key])) {
                resultArray.push(...inputObject[key]);
            }
        }

        return resultArray;
    }

    return (
        <div className={styles.container}>
            <label>
                <input
                    type="checkbox"
                    checked={advancedMode}
                    onChange={() => {
                        setAdvancedMode((prevState) => !prevState);
                    }}
                />
                <span></span>
            </label>

            <div className={styles.sectionTitle}>INGREDIENTS</div>
            <div className={styles.generalNutrients}>
                <div className={styles.nutrientLabels}>
                    <div className={styles.nutrientLabel}>TOTAL</div>
                    <div className={styles.nutrientLabel}>DAILY</div>
                </div>
                <div className={styles.nutrientName}>{ingredientsNutrition.totalNutrients.ENERC_KCAL.label}</div>
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

            <button className={styles.button} onClick={() => setAdvancedMode((prevState) => !prevState)}>
                {advancedMode ? "Widok podstawowy" : "Widok zaawansowany"}
            </button>

            {advancedMode ? (
                Object.keys(dividedIngredientData).map((unit) => (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={dividedIngredientData[unit]}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis label={{ value: unit, position: "insideLeft", offset: -10 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quantity" fill="#8884d8" />
                            <Bar dataKey="substitution_quantity" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                ))
            ) : (
                <div>
                    {ingredientDataArray.map((data) => (
                        <div>
                            <h2>
                                {data.label}: {data.quantity.toFixed(2)} | {data.substitution_quantity.toFixed(2)}
                            </h2>
                            <h2>
                                ({((data.substitution_quantity / data.quantity - 1) * 100).toFixed(2)}
                                %)
                            </h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
