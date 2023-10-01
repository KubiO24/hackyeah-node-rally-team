import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import Ingredients from "../components/Substitution";
import Substitutions from "../components/Nutrictions";
import Training from "../components/Training";
import MOCK_NUTRITIONS from "../MOCK_NUTRITIONS.json";

export default function Home({ navigateToPage, activePage }) {
    const [ingredientsNutrition, setIngredientsNutrition] = useState(MOCK_NUTRITIONS);
    const [substitutionsNutrition, setSubstitutionsNutrition] = useState(MOCK_NUTRITIONS);

    return (
        <>
            {activePage === "userForm" && <UserForm navigateToPage={navigateToPage} />}
            {activePage === "substitutions" && (
                <Substitution
                    navigateToPage={navigateToPage}
                    setIngredientsNutrition={setIngredientsNutrition}
                    ingredientsNutrition={ingredientsNutrition}
                    substitutionsNutrition={substitutionsNutrition}
                    setSubstitutionsNutrition={setSubstitutionsNutrition}
                />
            )}
            {activePage === "nutrictions" && (
                <Nutrictions
                    navigateToPage={navigateToPage}
                    ingredientsNutrition={ingredientsNutrition}
                    substitutionsNutrition={substitutionsNutrition}
                />
            )}
            {activePage === "training" && <Training navigateToPage={navigateToPage} />}
        </>
    );
}
