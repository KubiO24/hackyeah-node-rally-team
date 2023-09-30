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
    console.log(title);
    console.log(ingredients);

    chrome.runtime.sendMessage({ type: "setIngredients", ingredients });
}

// document.getElementById("prompt-textarea").style.backgroundColor = "red";
