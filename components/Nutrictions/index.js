import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import NutritionCharts from "./Charts";
import NutritionTable from "./Table";

export default function Nutrictions({ ingredientsNutrition, substitutionsNutrition }) {
    const [isTable, setIsTable] = useState(false);

    const tableClasses = `${styles.switchTab} ${isTable ? styles.active : ""}`;
    const chartClasses = `${styles.switchTab} ${!isTable ? styles.active : ""}`;

    return (
        <div className={styles.container}>
            <div className={styles.switch}>
                <div className={tableClasses} onClick={() => setIsTable(true)}>
                    TABLE
                </div>
                <div className={chartClasses} onClick={() => setIsTable(false)}>
                    CHARTS
                </div>
            </div>

            {!isTable && (
                <NutritionCharts
                    ingredientsNutrition={ingredientsNutrition}
                    substitutionsNutrition={substitutionsNutrition}
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
