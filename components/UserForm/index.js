import React, { useState } from "react";
import {
    activityOptions,
    foodAllergyOptions,
    sexOptions,
    trainingGoalOptions,
    trainingPreferenceOptions,
} from "../../constants/options";
import styles from "./UserForm.module.css";

export default function UserForm({ navigateToPage }) {
    // State variables for form input values
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [activity, setActivity] = useState("");
    const [trainingGoal, setTrainingGoal] = useState("");
    const [sex, setSex] = useState("");
    const [foodAllergy, setFoodAllergy] = useState([]); // Default to "None"
    const [trainingPreference, setTrainingPreference] = useState("");
    const [isPregnant, setIsPregnant] = useState(false); // New state for Pregnancy checkbox

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // You can access the form input values here and do something with them
        console.log("Weight:", weight);
        console.log("Height:", height);
        console.log("Activity:", activity);
        console.log("Training Goal:", trainingGoal);
        console.log("Sex:", sex);
        console.log("Food Allergy:", foodAllergy);
        console.log("Training Preference:", trainingPreference);
        console.log("Pregnancy:", isPregnant);

        // Validate
        if (weight === "") {
            alert("Please enter a weight");
            return;
        }
        if (height === "") {
            alert("Please enter a height");
            return;
        }
        if (activity === "") {
            alert("Please select an activity level");
            return;
        }
        if (trainingGoal === "") {
            alert("Please select a training goal");
            return;
        }
        if (sex === "") {
            alert("Please select a sex");
            return;
        }

        if (trainingPreference === "") {
            alert("Please select a training preference");
            return;
        }

        // Save the form input values to local storage
        localStorage.setItem("weight", weight);
        localStorage.setItem("height", height);
        localStorage.setItem("activity", activity);
        localStorage.setItem("trainingGoal", trainingGoal);
        localStorage.setItem("sex", sex);
        localStorage.setItem("foodAllergy", JSON.stringify(foodAllergy));
        localStorage.setItem("trainingPreference", trainingPreference);
        localStorage.setItem("isPregnant", isPregnant); // Store Pregnancy checkbox value

        // You can also navigate to the next page here if needed
        navigateToPage("ingredients"); // Call this function to navigate
    };

    // Function to toggle Pregnancy checkbox
    const togglePregnancy = () => {
        setIsPregnant(!isPregnant);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Weight:
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </label>
                <label>
                    Height:
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                </label>
                <label>
                    Activity:
                    <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                        <option value="">Select Activity</option>
                        {activityOptions.map((o) => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Training Goal:
                    <select value={trainingGoal} onChange={(e) => setTrainingGoal(e.target.value)}>
                        <option value="">Select Training Goal</option>
                        {trainingGoalOptions.map((o) => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Sex:
                    <select value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="">Select Sex</option>
                        {sexOptions.map((o) => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Training Preference:
                    <select value={trainingPreference} onChange={(e) => setTrainingPreference(e.target.value)}>
                        <option value="">Select Training Preference</option>
                        {trainingPreferenceOptions.map((o) => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                </label>
                <div className={styles.foodAllergy}>
                    <p>Select Food Allergies:</p>
                    {foodAllergyOptions.map((option) => (
                        <label key={option}>
                            <input
                                type="checkbox"
                                value={option}
                                checked={foodAllergy.includes(option)}
                                onChange={() => {
                                    // Toggle the other options
                                    setFoodAllergy((prevFoodAllergy) =>
                                        prevFoodAllergy.includes(option)
                                            ? prevFoodAllergy.filter((item) => item !== option)
                                            : [...prevFoodAllergy, option]
                                    );
                                }}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <div className={styles.pregnancy}>
                    <label>
                        <input type="checkbox" checked={isPregnant} onChange={togglePregnancy} />
                        Pregnancy
                    </label>
                </div>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
}
