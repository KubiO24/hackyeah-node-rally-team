import { useState } from "react";

import NutritionCharts from "./Charts";
import NutritionTable from "./Table";

import styles from "./styles.module.css";

export default function Nutritions({ ingredientsNutrition, substitutionsNutrition }) {
    const [isTable, setIsTable] = useState(false);

    const tableClasses = `${styles.switchTab} ${styles.tableTab} ${isTable ? styles.active : ""}`;
    const chartClasses = `${styles.switchTab} ${styles.chartTab} ${!isTable ? styles.active : ""}`;

    return (
        <div className={styles.container}>
            <div className={styles.switch}>
                <div className={tableClasses} onClick={() => setIsTable(true)}>
                    TABLE
                </div>
                <div className={chartClasses} onClick={() => setIsTable(false)}>
                    COMPARISON
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
