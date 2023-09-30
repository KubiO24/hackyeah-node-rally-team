import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function getCaloriesBurned(thisPerson, meal) {
  const activities = [
    { name: "Walking", kcal: 50 },
    { name: "Running", kcal: 114 },
    { name: "Cycling", kcal: 100 },
    { name: "Swimming", kcal: 120 },
    { name: "Weight lifting", kcal: 80 },
  ];

  const res = [
    ...activities.map((activity) => {
      return {
        name: activity.name,
        time: parseInt(
          (parseFloat(meal.kcal) / parseFloat(activity.kcal)) * 10
        ),
      };
    }),
  ];

  return res;
}
