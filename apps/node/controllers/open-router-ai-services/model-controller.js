const axios = require("axios");

const fixGrammar = async (model, prompt) => {
  try {
    const response = await axios.post(
      process.env.OPEN_ROUTER_API_BASE_URL,
      {
        model: model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_AI_KEY}`,
          //"HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          //"X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        timeout: 60000,
      },
    );
    console.log("response", JSON.stringify(response.data));

    return JSON.parse(response?.data?.choices?.[0]?.message?.content);
  } catch (error) {
    // console.log(error.message);
    throw error.message;
  }
};

const dailyPlanner = async (model, data) => {
  try {
    const response = await axios.post(
      process.env.OPEN_ROUTER_API_BASE_URL,
      {
        model: model,
        messages: [
          {
            role: "system",
            content:
              "You are an expert productivity coach who creates realistic daily schedules.",
          },
          {
            role: "user",
            content: `
You are an AI daily planner.

Generate a daily plan in the following JSON format ONLY.
Do not add markdown, add very small explanation. Add a small user friendly details for activity.

JSON format:
{
  "meta": {...},
  "summary": {...},
  "schedule": [...],
  "tips": [...]
}

User details:
Profession: ${data.profession}
Work hours: ${data.startWorkHours} – ${data.endWorkHours}
Energy level: ${data.energyLevel}
Timezone: Asia/Kolkata

  Rules:
- Use realistic time blocks
- Include breaks
- Balance work, learning, and wellness

        `,
          },
        ],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_AI_KEY}`,
          //"HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          //"X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        timeout: 60000,
      },
    );

    return JSON.parse(response?.data?.choices?.[0]?.message?.content);
  } catch (error) {
    throw error.message;
    // console.log(error.message);
  }
};

module.exports = {
  fixGrammar,
  dailyPlanner,
};
