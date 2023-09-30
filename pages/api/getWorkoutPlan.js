const axios = require("axios");

export default async function handler(req, res) {
  const { muscle, type, difficulty } = req.body;

  console.log(process.env.NINJA_API_KEY, process.env.OPENAI_API_KEY);
  const options = {
    method: "GET",
    url: "https://api.api-ninjas.com/v1/exercises",
    params: { muscle, type, difficulty },
    headers: {
      "X-Api-Key": process.env.NINJA_API_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.status(200).json({ excercises: response.data });
  } catch (error) {
    console.error(error);
  }
}
