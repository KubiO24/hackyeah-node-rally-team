const handler = async (req, res) => {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    const { ingredients } = req.body;

    try {
        validateIngredients(ingredients);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

    const data = await fetchIngredientsData(ingredients);

    res.status(200).json({ data: data });
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
