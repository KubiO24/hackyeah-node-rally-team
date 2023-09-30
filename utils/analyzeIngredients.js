const analyzeIngredients = async (ingredients) => {
    console.log("ingredients: ", ingredients);
    try {
        validateIngredients(ingredients);
    } catch (err) {
        return null;
    }

    const data = await fetchIngredientsData(ingredients);
    console.log(data);

    return data;
};

const validateIngredients = (ingredients) => {
    if (ingredients === undefined) throw new Error("No ingredients provided");
    if (ingredients.length === 0) throw new Error("No ingredients provided");
};

const fetchIngredientsData = async (ingredients) => {
    const payload = preparePayload(ingredients);
    const url = `${process.env.NEXT_PUBLIC_EDEMAM_BASE_URL}/api/nutrition-details?app_id=${process.env.NEXT_PUBLIC_EDEMAM_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDEMAM_APP_KEY}`;
    console.log("url: ", url);
    console.log("payload: ", payload);
    const response = await fetch(url, payload);

    const data = await response.json();
    console.log("data: ", data);

    return data;
};

const preparePayload = (ingredients) => {
    const body = {
        ingr: ingredients,
    };

    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return payload;
};

export default analyzeIngredients;
