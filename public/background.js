chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "setIngredients":
            ingredients = message.ingredients;
            break;
        case "getIngredients":
            sendResponse(ingredients);
            break;
        default:
            console.error("Unrecognised message: ", message);
    }
});
