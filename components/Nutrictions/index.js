import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import NutritionCharts from "./Charts";
import NutritionTable from "./Table";

export default function Nutrictions({ ingredientsNutrition, substitutionsNutrition }) {
    const [advancedMode, setAdvancedMode] = useState(false);

    const [isTable, setIsTable] = useState(false);

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() => setAdvancedMode((prevState) => !prevState)}>
                {advancedMode ? "Widok podstawowy" : "Widok zaawansowany"}
            </button>

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

            {!isTable && (
                <NutritionCharts
                    ingredientsNutrition={ingredientsNutrition}
                    substitutionsNutrition={substitutionsNutrition}
                    advancedMode={advancedMode}
                />
            )}

            {isTable && (
                <NutritionTable
                    ingredientsNutrition={ingredientsNutrition}
                    substitutionsNutrition={substitutionsNutrition}
                />
            )}
        </div>
    );
}
