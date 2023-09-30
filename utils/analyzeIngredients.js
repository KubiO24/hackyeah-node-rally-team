const analyzeIngredients = async (ingredients) => {
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
    const url = `${process.env.EDEMAM_BASE_URL}/api/nutrition-details?app_id=${process.env.EDEMAM_APP_ID}&app_key=${process.env.EDEMAM_APP_KEY}`;

    const response = await fetch(url, payload);
    const data = await response.json();

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

export default handler;
