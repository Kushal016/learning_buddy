const axios = require("axios");

const callORAI = async (model, prompt) => {
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

    return response?.data?.choices?.[0]?.message?.content;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = callORAI;
