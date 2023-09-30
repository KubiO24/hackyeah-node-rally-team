const axios = require("axios");

export default async function getCaloriesBurned(duration, weight, activity) {
  console.log(activity);
  if (!activity) {
    activity = "run";
  }

  const options = {
    method: "GET",
    url: "https://api.api-ninjas.com/v1/caloriesburned",
    params: { duration, weight, activity },
    headers: {
      "X-Api-Key": process.env.NINJA_API_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  return [...response.data];
}
