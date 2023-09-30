import OpenAI from "openai";
import { ENV } from "../constants/env";

const openai = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function getWorkoutPlan(thisPerson, meal) {
  let prompt = `You are professional dietician. What activities would you suggest to the person that is ${thisPerson.sex} weights ${thisPerson.weight} kilos and is ${thisPerson.height} cm height after a meal that had ${meal.kcal} kcal ${meal.carbs} grams of carbs (sugars ${meal.sugar} grams), ${meal.proteins} grams of proteins and ${meal.fat} grams of fat, keep in mind that prefferred type of activity for that person is fitness training ${thisPerson.activity} , create list of excerises in list (max length 5) of objects in format '{title: string, description: string, excersises: string[]}', it has to be valid json. No prose.`;

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
