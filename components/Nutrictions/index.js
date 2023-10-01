import { useEffect, useState } from "react";
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
import NutritionCharts from "./Charts";
import NutritionTable from "./Table";

export default function Nutrictions({
  ingredientsNutrition,
  substitutionsNutrition,
}) {
  const [isTable, setIsTable] = useState(false);

  return (
    <div className={styles.container}>
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
