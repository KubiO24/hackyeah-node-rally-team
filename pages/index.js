import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import Ingredients from "../components/Ingredients";
import Substitutions from "../components/Substitutions";
import Training from "../components/Training";
import MOCK_NUTRITIONS from "../MOCK_NUTRITIONS.json";

export default function Home({ navigateToPage, activePage }) {
    const [ingredientsNutrition, setIngredientsNutrition] = useState(MOCK_NUTRITIONS);
    const [substitutionsNutrition, setSubstitutionsNutrition] = useState(MOCK_NUTRITIONS);

    return (
        <>
            {activePage === "userForm" && <UserForm navigateToPage={navigateToPage} />}
            {activePage === "ingredients" && (
                <Ingredients
                    navigateToPage={navigateToPage}
                    setIngredientsNutrition={setIngredientsNutrition}
                    ingredientsNutrition={ingredientsNutrition}
                    substitutionsNutrition={substitutionsNutrition}
                    setSubstitutionsNutrition={setSubstitutionsNutrition}
                />
            )}
            {activePage === "substitutions" && (
                <Substitutions
                    navigateToPage={navigateToPage}
                    ingredientsNutrition={ingredientsNutrition}
                    substitutionsNutrition={substitutionsNutrition}
                />
            )}
            {activePage === "training" && <Training navigateToPage={navigateToPage} />}
        </>
    );
}
