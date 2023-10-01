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

            <div className={styles.sectionTitle} style={{ marginTop: 0 }}>
                Total Nutritional Values
            </div>

            <div className={styles.generalNutrients}>
                <div className={styles.nutrientLine}>
                    <div className={styles.nutrientName} />

                    <div className={styles.nutrientValues}>
                        <div className={styles.nutrientLabel}>TOTAL</div>
                        <div className={styles.nutrientLabel}>NRV</div>
                    </div>
                </div>

                <div className={styles.nutrientLine}>
                    <div className={styles.nutrientName}>{dataSource.totalNutrients.ENERC_KCAL.label}</div>

                    <div className={styles.nutrientValues}>
                        <span>
                            {dataSource.totalNutrients.ENERC_KCAL.quantity.toFixed(2)}{" "}
                            {dataSource.totalNutrients.ENERC_KCAL.unit}
                        </span>

                        <span>
                            {dataSource.totalDaily.ENERC_KCAL.quantity.toFixed(2)}
                            {dataSource.totalDaily.ENERC_KCAL.unit}
                        </span>
                    </div>
                </div>

                <div className={styles.nutrientLine}>
                    <div className={styles.nutrientName}>{dataSource.totalNutrients.FAT.label}</div>

                    <div className={styles.nutrientValues}>
                        <span>
                            {dataSource.totalNutrients.FAT.quantity.toFixed(2)} {dataSource.totalNutrients.FAT.unit}
                        </span>

                        <span>
                            {dataSource.totalDaily.FAT.quantity.toFixed(2)}
                            {dataSource.totalDaily.FAT.unit}
                        </span>
                    </div>
                </div>

                <div className={styles.nutrientLine}>
                    <div className={styles.nutrientName}>{dataSource.totalNutrients.PROCNT.label}</div>

                    <div className={styles.nutrientValues}>
                        <span>
                            {dataSource.totalNutrients.PROCNT.quantity.toFixed(2)}{" "}
                            {dataSource.totalNutrients.PROCNT.unit}
                        </span>

                        <span>
                            {dataSource.totalDaily.PROCNT.quantity.toFixed(2)}
                            {dataSource.totalDaily.PROCNT.unit}
                        </span>
                    </div>
                </div>

                <div className={styles.nutrientLine}>
                    <div className={styles.nutrientName}>{dataSource.totalNutrients.CHOLE.label}</div>

                    <div className={styles.nutrientValues}>
                        <span>
                            {dataSource.totalNutrients.CHOLE.quantity.toFixed(2)} {dataSource.totalNutrients.CHOLE.unit}
                        </span>

                        <span>
                            {dataSource.totalDaily.CHOLE.quantity.toFixed(2)}
                            {dataSource.totalDaily.CHOLE.unit}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.sectionTitle}>Ingredients Nutritional Values</div>
            {dataSource.ingredients.map((ingredientRaw) => {
                const ingredient = ingredientRaw.parsed[0];

                return (
                    <div className={styles.ingredientSection}>
                        <div className={styles.ingredientName}>{ingredient.food}</div>

                        <div className={styles.ingredientNutrients}>
                            <span>{ingredient.nutrients.ENERC_KCAL.label}</span>

                            <span>
                                <span>{ingredient.nutrients.ENERC_KCAL.quantity.toFixed(2)}</span>{" "}
                                <span>{ingredient.nutrients.ENERC_KCAL.unit}</span>
                            </span>
                        </div>

                        <div className={styles.ingredientNutrients}>
                            <span>{ingredient.nutrients.FAT.label}</span>

                            <span>
                                <span>{ingredient.nutrients.FAT.quantity.toFixed(2)}</span>{" "}
                                <span>{ingredient.nutrients.FAT.unit}</span>
                            </span>
                        </div>

                        <div className={styles.ingredientNutrients}>
                            <span>{ingredient.nutrients.PROCNT.label}</span>

                            <span>
                                <span>{ingredient.nutrients.PROCNT.quantity.toFixed(2)}</span>{" "}
                                <span>{ingredient.nutrients.PROCNT.unit}</span>
                            </span>
                        </div>

                        <div className={styles.ingredientNutrients}>
                            <span>{ingredient.nutrients.CHOLE.label}</span>

                            <span>
                                <span>{ingredient.nutrients.CHOLE.quantity.toFixed(2)}</span>{" "}
                                <span>{ingredient.nutrients.CHOLE.unit}</span>
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default NutritionTable;
