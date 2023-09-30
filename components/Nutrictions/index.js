import styles from "./styles.module.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Nutrictions({
  ingredientsNutrition,
  substitutionsNutrition,
}) {
  let ingredientData = Object.values(ingredientsNutrition.totalNutrients ?? {});
  let substituteData = Object.values(
    substitutionsNutrition.totalNutrients ?? {}
  );

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
      const randomPercentage =
        Math.random() * (maxPercentage - minPercentage) + minPercentage;
      const substitutionQuantity = originalQuantity * randomPercentage;

      // Add the substitution_quantity property to the item
      data[key].substitution_quantity = substitutionQuantity;

      result[unit].push(data[key]);
    }

    return result;
  }

  const dividedIngredientData = groupByUnit(ingredientData);

  console.log(dividedIngredientData);

  return (
    <div className={styles.container}>
      {Object.keys(dividedIngredientData).map((unit) => (
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
            <YAxis
              label={{ value: unit, position: "insideLeft", offset: -10 }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
            <Bar dataKey="substitution_quantity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ))}

      <div>SUBSTITUTION NUTRITION</div>
      <div>{JSON.stringify(substitutionsNutrition, null, 5)}</div>
    </div>
  );
}