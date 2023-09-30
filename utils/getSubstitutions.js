import OpenAI from "openai";
import { ENV } from "../constants/env";

const openai = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function getSubstitutions(recipe) {
  let prompt =
    "You are professional dietician. Please check this recipe and tell me if it is healthy. If any ingredient has better substitute change recipe to use it and all descriptions why it is better to use it will nutritions facts. Next you should output only numerated list of only ingredient substitution that will make big impact on recipe health, nothing more in format '{ingredient: ..., substitution: ..., reason: ...}', You cannot display ingredient in list when no substitution is needed. Overall format should be : '{healthProcent: ..., list: }', it has to be valid json. No prose. Here is recipe:";

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
    return err;
  }
}
