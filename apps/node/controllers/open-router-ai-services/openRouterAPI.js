const axios = require("axios");

const openRouter = async ({ model, prompt, systemPrompt }) => {
  try {
    if (!prompt) throw new Error("Invalid prompt");
    if (!systemPrompt) throw new Error("Inalid system prompt");

    const response = await axios.post(
      process.env.OPEN_ROUTER_API_BASE_URL,
      {
        model: model,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_AI_KEY}`,
          //"HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "Learning-buddy", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        timeout: 60000,
      },
    );
    return JSON.parse(response?.data?.choices?.[0]?.message?.content);
  } catch (error) {
    console.log(error.message);

    throw new Error("Unable to call open router.");
  }
};

module.exports = openRouter;
