chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "setRecipeData":
            recipeData = message.recipeData;
            break;
        case "getRecipeData":
            sendResponse(recipeData);
            break;
        default:
            console.error("Unrecognised message: ", message);
    }
});
