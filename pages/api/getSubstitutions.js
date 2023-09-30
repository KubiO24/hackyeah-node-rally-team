import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//Receipe format:
// ${recipe title} ingredient: list of ingredient

export default async function handler(req, res) {
  let prompt =
    "You are professional dietician. Please check this recipe and tell me if it is healthy. If any ingredient has better substitute change recipe to use it and all descriptions why it is better to use it will nutritions facts.First line of your output should be: 'Meal is healthy in ${procent}%' and you should generate procent variable. Next you should output only numerated list of only ingredient  substitution that  will make big impact on recipe health, nothing more in format 'Ingredient : ${nameOfIngredient} \n - substitution: ... \n reason: ...', You cannot display ingredient in list when no substitution is needed. No prose. Here is recipe: ";

  prompt += req.body.recipe;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  console.log(chatCompletion.choices[0].message.content);

  const text = chatCompletion.choices[0].message.content;
  const mealInfo = {};

  // Extract health percentage
  const healthPercentageRegex = /Meal is healthy in (\d+)%/;
  const healthPercentageMatch = text.match(healthPercentageRegex);
  if (healthPercentageMatch) {
    mealInfo.healthPercentage = parseInt(healthPercentageMatch[1]);
  }

  // Extract ingredients, substitutions, and reasons
  const ingredientRegex =
    /Ingredient : ([^\n]+)\n - substitution: ([^\n]+) \n reason: ([^\n]+)/g;
  const ingredientMatches = text.matchAll(ingredientRegex);

  mealInfo.ingredients = [];

  for (const match of ingredientMatches) {
    const ingredientObj = {
      ingredient: match[1].trim(),
      substitution: match[2].trim(),
      reason: match[3].trim(),
    };
    mealInfo.ingredients.push(ingredientObj);
  }

  console.log(mealInfo);

  res.status(200).json({ message: chatCompletion.choices[0].message.content });
}
