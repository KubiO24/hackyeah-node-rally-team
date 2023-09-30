import React, { useEffect, useState } from "react";
import Index from "../components/Index";
import UserForm from "../components/UserForm";
import Ingredients from "../components/Ingredients";
import Substitutions from "../components/Substitutions";
import Training from "../components/Training";

export default function Home({ navigateToPage, activePage }) {
  const [ingredientsNutrition, setIngredientsNutrition] = useState({});

  useEffect(() => {
    let initalPage = localStorage.getItem("weight")
      ? "ingredients"
      : "userForm";
    navigateToPage(initalPage);
  }, []);

  return (
    <>
      {activePage === "userForm" && (
        <UserForm navigateToPage={navigateToPage} />
      )}
      {activePage === "ingredients" && (
        <Ingredients
          navigateToPage={navigateToPage}
          setIngredientsNutrition={setIngredientsNutrition}
        />
      )}
      {activePage === "substitutions" && (
        <Substitutions navigateToPage={navigateToPage} />
      )}
      {activePage === "training" && (
        <Training navigateToPage={navigateToPage} />
      )}
    </>
  );
}
