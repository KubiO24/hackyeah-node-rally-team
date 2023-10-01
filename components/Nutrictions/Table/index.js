import styles from "./styles.module.css";

const NutritionTable = ({ ingredientsNutrition, substitutionsNutrition }) => {
    return (
        <div className={styles.container}>
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
        </div>
    );
};

export default NutritionTable;
