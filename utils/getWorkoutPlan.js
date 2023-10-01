import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function getWorkoutPlan(
  thisPerson,
  meal,
  maxTraningTime = 60
) {
  console.log(thisPerson);

  let prompt = `You are professional dietician. What activities would you suggest to the person that is ${thisPerson.sex} weights ${thisPerson.weight} kilos and is ${thisPerson.height} cm height after a meal that had ${meal.kcal} kcal ${meal.carbs} grams of carbs, ${meal.proteins} grams of proteins and ${meal.fat} grams of fat, keep in mind that prefferred type of activity for that person is ${thisPerson.activity.name} training and that max trening time for that person is ${maxTraningTime} this person's goal in working out is ${thisPerson.goal} , create list of excerises in list (max length 3, could be less) of objects in format '{title: string, description: string, excersises: {name: string, duration: string, burnedCalories: number}[]}', keep in mind that it should be array of objects, it has to be valid json. No prose.`;

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
