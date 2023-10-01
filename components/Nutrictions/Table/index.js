import styles from "./styles.module.css";
import { useEffect, useState } from "react";

const NutritionTable = ({ ingredientsNutrition, substitutionsNutrition }) => {
    const [dataSource, setDataSource] = useState(ingredientsNutrition);
    const [isIngredients, setIsIngredients] = useState(true);

    const ingredientsSwitchClasses = `${styles.switchTab} ${isIngredients ? styles.active : ""}`;
    const substitutionsSwitchClasses = `${styles.switchTab} ${!isIngredients ? styles.active : ""}`;

    return (
        <div className={styles.container}>
            <div className={styles.switch}>
                <div
                    className={ingredientsSwitchClasses}
                    onClick={() => {
                        setIsIngredients(true);
                        setDataSource(ingredientsNutrition);
                    }}
                >
                    INGREDIENTS
                </div>
                <div
                    className={substitutionsSwitchClasses}
                    onClick={() => {
                        setIsIngredients(false);
                        setDataSource(substitutionsNutrition);
                    }}
                >
                    SUBSTITUTIONS
                </div>
            </div>

            <div className={styles.sectionTitle}>INGREDIENTS</div>
            <div className={styles.generalNutrients}>
                <div className={styles.nutrientLabels}>
                    <div className={styles.nutrientLabel}>TOTAL</div>
                    <div className={styles.nutrientLabel}>DAILY</div>
                </div>
                <div className={styles.nutrientName}>{dataSource.totalNutrients.ENERC_KCAL.label}</div>
                <div className={styles.nutrientValues}>
                    <div>{dataSource.totalNutrients.ENERC_KCAL.quantity.toFixed(2)}</div>
                    <div>{dataSource.totalNutrients.ENERC_KCAL.unit}</div>
                    <div>{dataSource.totalDaily.ENERC_KCAL.quantity.toFixed(2)}</div>
                    <div>{dataSource.totalDaily.ENERC_KCAL.unit}</div>
                </div>
                <div className={styles.nutrientName}>{dataSource.totalNutrients.FAT.label}</div>
                <div className={styles.nutrientValues}>
                    <div>{dataSource.totalNutrients.FAT.quantity.toFixed(2)}</div>
                    <div>{dataSource.totalNutrients.FAT.unit}</div>
                    <div>{dataSource.totalDaily.FAT.quantity.toFixed(2)}</div>
                    <div>{dataSource.totalDaily.FAT.unit}</div>
                </div>
                <div className={styles.nutrientName}>{dataSource.totalNutrients.PROCNT.label}</div>
                <div className={styles.nutrientValues}>
                    <div>{dataSource.totalNutrients.PROCNT.quantity.toFixed(2)}</div>
                    <div>{dataSource.totalNutrients.PROCNT.unit}</div>
                    <div>{dataSource.totalDaily.PROCNT.quantity.toFixed(2)}</div>
                    <div>{dataSource.totalDaily.PROCNT.unit}</div>
                </div>
                <div className={styles.nutrientName}>{dataSource.totalNutrients.CHOLE.label}</div>
                <div className={styles.nutrientValues}>
                    <div>{dataSource.totalNutrients.CHOLE.quantity.toFixed(2)}</div>
                    <div>{dataSource.totalNutrients.CHOLE.unit}</div>
                    <div>{dataSource.totalDaily.CHOLE.quantity.toFixed(2)}</div>
                    <div>{dataSource.totalDaily.CHOLE.unit}</div>
                </div>
            </div>

            <div className={styles.sectionTitle}>INGREDIENTS</div>
            {dataSource.ingredients.map((ingredientRaw) => {
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
    );
};

export default NutritionTable;
