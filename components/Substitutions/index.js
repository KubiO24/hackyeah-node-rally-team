import styles from "./styles.module.css";
import MOCK_NUTRITIONS from "../../MOCK_NUTRITIONS.json";

export default function Substitutions({ ingredientsNutrition, substitutionsNutrition }) {
    return (
        <div className={styles.container}>
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
                <div className={styles.nutrientName}>{MOCK_NUTRITIONS.totalNutrients.ENERC_KCAL.label}</div>
                <div className={styles.nutrientValues}>
                    <div>{MOCK_NUTRITIONS.totalNutrients.ENERC_KCAL.quantity.toFixed(2)}</div>
                    <div>{MOCK_NUTRITIONS.totalNutrients.ENERC_KCAL.unit}</div>
                    <div>{MOCK_NUTRITIONS.totalDaily.ENERC_KCAL.quantity.toFixed(2)}</div>
                    <div>{MOCK_NUTRITIONS.totalDaily.ENERC_KCAL.unit}</div>
                </div>
                <div className={styles.nutrientName}>{MOCK_NUTRITIONS.totalNutrients.FAT.label}</div>
                <div className={styles.nutrientValues}>
                    <div>{MOCK_NUTRITIONS.totalNutrients.FAT.quantity.toFixed(2)}</div>
                    <div>{MOCK_NUTRITIONS.totalNutrients.FAT.unit}</div>
                    <div>{MOCK_NUTRITIONS.totalDaily.FAT.quantity.toFixed(2)}</div>
                    <div>{MOCK_NUTRITIONS.totalDaily.FAT.unit}</div>
                </div>
                <div className={styles.nutrientName}>{MOCK_NUTRITIONS.totalNutrients.PROCNT.label}</div>
                <div className={styles.nutrientValues}>
                    <div>{MOCK_NUTRITIONS.totalNutrients.PROCNT.quantity.toFixed(2)}</div>
                    <div>{MOCK_NUTRITIONS.totalNutrients.PROCNT.unit}</div>
                    <div>{MOCK_NUTRITIONS.totalDaily.PROCNT.quantity.toFixed(2)}</div>
                    <div>{MOCK_NUTRITIONS.totalDaily.PROCNT.unit}</div>
                </div>
                <div className={styles.nutrientName}>{MOCK_NUTRITIONS.totalNutrients.CHOLE.label}</div>
                <div className={styles.nutrientValues}>
                    <div>{MOCK_NUTRITIONS.totalNutrients.CHOLE.quantity.toFixed(2)}</div>
                    <div>{MOCK_NUTRITIONS.totalNutrients.CHOLE.unit}</div>
                    <div>{MOCK_NUTRITIONS.totalDaily.CHOLE.quantity.toFixed(2)}</div>
                    <div>{MOCK_NUTRITIONS.totalDaily.CHOLE.unit}</div>
                </div>
            </div>

            <div className={styles.sectionTitle}>INGREDIENTS</div>
            {MOCK_NUTRITIONS.ingredients.map((ingredientRaw) => {
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
}
