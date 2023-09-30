const getAllRecipesTitle = () => {
    const titleElement = document.getElementById("article-heading_1-0");
    if (!titleElement) return null;

    const title = titleElement.innerText;

    return title;
};

const getAllRecipesIngredients = () => {
    const ingredients = [];

    const ingredientsElementsList = document.querySelectorAll(".mntl-structured-ingredients__list");
    if (!ingredientsElementsList) return null;

    for (const ingredientsElement of ingredientsElementsList) {
        for (const ingredientElementsList of ingredientsElement.children) {
            const ingredientElement = ingredientElementsList.children[0];

            let ingredient = "";
            for (const element of ingredientElement.children) {
                ingredient += element.innerText + " ";
            }

            ingredients.push(ingredient.trim());
        }
    }

    return ingredients;
};
