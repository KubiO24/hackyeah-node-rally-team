import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import Ingredients from "../components/Ingredients";
import Substitutions from "../components/Substitutions";
import Training from "../components/Training";

export default function Home({ navigateToPage, activePage }) {
  const [ingredientsNutrition, setIngredientsNutrition] = useState({});
  return (
    <>
      {activePage === "userForm" && (
        <UserForm navigateToPage={navigateToPage} />
      )}
      {activePage === "ingredients" && (
        <Ingredients navigateToPage={navigateToPage} />
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
