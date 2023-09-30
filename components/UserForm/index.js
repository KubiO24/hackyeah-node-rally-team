import {
  activityOptions,
  foodAllergyOptions,
  sexOptions,
  trainingGoalOptions,
  trainingPreferenceOptions,
} from "../../constants/options";
import styles from "./UserForm.module.css";

export default function UserForm({ navigateToPage }) {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input placeholder="Weight" type="number" />
        <input placeholder="Height" type="number" />
        <select>
          {activityOptions.map((o) => (
            <option value={o}>{o}</option>
          ))}
        </select>
        <select>
          {trainingGoalOptions.map((o) => (
            <option value={o}>{o}</option>
          ))}
        </select>
        <select>
          {sexOptions.map((o) => (
            <option value={o}>{o}</option>
          ))}
        </select>
        <select>
          {foodAllergyOptions.map((o) => (
            <option value={o}>{o}</option>
          ))}
        </select>
        <select>
          {trainingPreferenceOptions.map((o) => (
            <option value={o}>{o}</option>
          ))}
        </select>
      </div>
      <button>Continue</button>
    </div>
  );
}
