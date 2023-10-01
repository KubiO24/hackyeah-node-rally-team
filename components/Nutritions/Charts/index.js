import { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./styles.module.css";

const NutritionCharts = ({ ingredientsNutrition, substitutionsNutrition }) => {
    const [advancedMode, setAdvancedMode] = useState(false);

    let ingredientData = Object.values(ingredientsNutrition.totalNutrients ?? {});
    let substitutionData = Object.values(substitutionsNutrition.totalNutrients ?? {});

    const badLabels = ["energy", "fat", "sugar", "cholesterol", "carbohydrates"];

    function groupByUnit(data, substitutionData) {
        const result = {};

        for (const key in data) {
            const unit = data[key].unit;
            if (!result[unit]) {
                result[unit] = [];
            }

            // Calculate the random substitution quantity between 0.6 and 1.4 times the original quantity
            const originalQuantity = data[key].quantity;
            const substitutionQuantity = substitutionData[key].quantity;

            // Add the substitution_quantity property to the item
            data[key].substitution_quantity = substitutionQuantity;
            // data[key].substitution_quantity = originalQuantity;

            result[unit].push(data[key]);
        }

        return result;
    }

    let groupedData = groupByUnit(ingredientData, substitutionData);

    function extractObjectsToArray(inputObject) {
        const resultArray = [];

        for (const key in inputObject) {
            if (Array.isArray(inputObject[key])) {
                resultArray.push(...inputObject[key]);
            }
        }

        return resultArray;
    }

    let arrayData = extractObjectsToArray(groupedData);

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() => setAdvancedMode((prevState) => !prevState)}>
                {advancedMode ? "Widok podstawowy" : "Widok zaawansowany"}
            </button>
            {advancedMode ? (
                Object.keys(groupedData).map((unit) => (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={groupedData[unit]}
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
                    {arrayData.map((data) => (
                        <>
                            {data.label.length <= 25 &&
                                data.substitution_quantity > 0 &&
                                data.quantity > 0 &&
                                (data.substitution_quantity / data.quantity - 1) * 100 < 200 && (
                                    <div className={styles.line}>
                                        <h3>
                                            {badLabels.some((v) => data.label.toLowerCase().includes(v))
                                                ? "(b)"
                                                : "(g)"}
                                            {data.label}: {data.quantity.toFixed(2)} |{" "}
                                            {data.substitution_quantity.toFixed(2)}
                                        </h3>
                                        <h2
                                            style={{
                                                color:
                                                    data.substitution_quantity / data.quantity - 1 > 0
                                                        ? badLabels.some((v) => data.label.toLowerCase().includes(v))
                                                            ? "red"
                                                            : "green"
                                                        : badLabels.some((v) => data.label.toLowerCase().includes(v))
                                                        ? "green"
                                                        : "red",
                                            }}
                                        >
                                            {data.substitution_quantity / data.quantity - 1 > 0 && "+"}
                                            {((data.substitution_quantity / data.quantity - 1) * 100).toFixed(2)}%
                                        </h2>
                                    </div>
                                )}
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NutritionCharts;
