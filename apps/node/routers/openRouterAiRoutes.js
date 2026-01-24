const auth = require("../controllers/auth/middleware");
const {
  fixGrammar,
  dailyPlanner,
} = require("../controllers/open-router-ai-services/model-controller");
const { default: GrammarFix } = require("../models/GrammarFix");
const express = require("express");
// const router = require("express").Router();
const router = express.Router();

router.post("/grammarfix", auth, async (req, res) => {
  const { text, tone } = req.body;

  if (!text || text.length > 800) {
    return res.status(400).json({ message: "Invalid text length" });
  }

  const prompt = `
    Fix grammar of the following text in the following JSON format ONLY.
    Keep the meaning same.
    Tone: ${tone || "neutral"}
    Text:${text}
    JSON format:
{
  "meta": {...},
  "Text": {...},
  "Corrected": [...],
  "explanation":
}
  `;

  try {
    const result = await fixGrammar(process.env.OPEN_ROUTER_AI_MODEL, prompt);

    // const correctedText = result[0]?.generated_text;
    // await GrammarFix.create({
    //   userId: req.user._id,
    //   inputText: text,
    //   correctedText,
    //   tone,
    // });

    res.json({ correctedText: result });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "AI service error" });
  }
});

router.post("/daily-planner", auth, async (req, res) => {
  const reqBody = req.body;

  try {
    const response = await dailyPlanner(
      "meta-llama/llama-3.1-8b-instruct",
      reqBody,
    );

    // const correctedText = result[0]?.generated_text;
    // await GrammarFix.create({
    //   userId: req.user._id,
    //   inputText: text,
    //   correctedText,
    //   tone,
    // });

    res.json({ responsePlan: response });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "AI service error", err: err.message });
  }
});

module.exports = router;
