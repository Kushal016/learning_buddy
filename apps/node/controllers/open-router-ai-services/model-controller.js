const axios = require("axios");
const openRouter = require("./openRouterAPI");

const fixGrammar = async (data) => {
  try {
    const prompt = `
    Correct the grammar of the following text.

Respond ONLY in valid JSON using this structure:

{
  "original_text": "",
  "corrected_text": "",
  "changes_summary": [],
  "confidence_score": 0.0
}

Rules:
- Do not add extra explanations
- Keep original meaning intact
- Confidence score should be between 0 and 1
- No markdown
- No text outside JSON

Text:"${data?.text}"
Tone: ${data.tone || "neutral"}
`;
    const response = await openRouter({
      model: "mistralai/mistral-7b-instruct",
      systemPrompt: "You are an expert in fixing the grammar of a text.",
      prompt,
    });
    if (response) return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const dailyPlanner = async (data) => {
  try {
    const prompt = `
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
Work hours: ${data.startWorkHours} - ${data.endWorkHours}
Energy level: ${data.energyLevel}
Timezone: Asia/Kolkata

  Rules:
- Use realistic time blocks
- Include breaks
- Balance work, learning, and wellness

        `;
    const response = await openRouter({
      model: "meta-llama/llama-3.1-8b-instruct",
      systemPrompt:
        "You are an expert productivity coach who creates realistic daily schedules.",

      prompt,
    });
    if (response) return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const explainTopic = async (data) => {
  try {
    if (data.topic !== null) {
      const prompt = `
      Explain the topic "${data.topic}". Consider the detail level as ${data?.level ?? "beginner"}

Respond ONLY in valid JSON using this structure:

{
  "topic": "",
  "DetailLevel": "beginner | intermediate | advanced",
  "definition": "",
  "why_it_matters": "",
  "core_concepts": [],
  "example": {
    "title": "",
    "explanation": ""
  },
  "common_mistakes": [],
  "summary": ""
}

Rules:
- No markdown
- No extra text outside JSON
- Keep explanations beginner-friendly
      `;

      const response = await openRouter({
        model: "mistralai/mistral-7b-instruct",
        systemPrompt: "You are an expert to explain topics.",
        prompt,
      });
      if (response) return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  fixGrammar,
  dailyPlanner,
  explainTopic,
};
