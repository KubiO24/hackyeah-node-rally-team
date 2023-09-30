const url = window.location.href;
const urlObject = new URL(url);
const domain = urlObject.hostname;

let title, ingredients;

// allrecipes
if (domain.includes("allrecipes")) {
    title = getAllRecipesTitle();
    ingredients = getAllRecipesIngredients();
}

if (title && ingredients && ingredients.length > 0) {
    const recipeData = { title, ingredients };
    console.log(recipeData);

    chrome.runtime.sendMessage({ type: "setRecipeData", recipeData });
}

// document.getElementById("prompt-textarea").style.backgroundColor = "red";
