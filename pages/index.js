import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import Ingredients from "../components/Ingredients";
import Substitutions from "../components/Substitutions";
import Training from "../components/Training";

export default function Home({ navigateToPage, activePage }) {
    const [ingredientsNutrition, setIngredientsNutrition] = useState({});
    const [substitutionsNutrition, setSubstitutionsNutrition] = useState({});

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
            {activePage === "substitutions" && <Substitutions navigateToPage={navigateToPage} />}
            {activePage === "training" && <Training navigateToPage={navigateToPage} />}
        </>
    );
}
