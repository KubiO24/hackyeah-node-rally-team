import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function getAllergenes(allergies) {
  let prompt = `You are professional dietician. I am allergic to ${allergies}. Please check this recipe and tell me if i am allergic to any of ingredients in format '['allergicIngredient', 'allergicIngredient']', those ingredients must be from recipe. Overall format should be : '{allergicTo: list: }', it has to be valid json. No prose. Here is recipe:
    `;

  prompt += recipe;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    max_tokens: 3000,
  });

  try {
    let data = JSON.parse(chatCompletion.choices[0].message.content);
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
