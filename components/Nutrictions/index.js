import styles from "./styles.module.css";

export default function Nutrictions({
  ingredientsNutrition,
  substitutionsNutrition,
}) {
  return (
    <div className={styles.container}>
      <div>INGREDIENTS NUTRITION</div>
      <div>{JSON.stringify(ingredientsNutrition, null, 5)}</div>
      <div>SUBSTITUTION NUTRITION</div>
      <div>{JSON.stringify(substitutionsNutrition, null, 5)}</div>
    </div>
  );
}
