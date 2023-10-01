import { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./styles.module.css";

const NutritionCharts = ({ ingredientsNutrition, substitutionsNutrition, advancedMode }) => {
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
            // data[key].substitution_quantity = originalQuantity;

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
};

export default NutritionCharts;
