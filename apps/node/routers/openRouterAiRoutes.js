const auth = require("../controllers/auth/middleware");
const {
  fixGrammar,
  dailyPlanner,
  explainTopic,
} = require("../controllers/open-router-ai-services/model-controller");
const { default: GrammarFix } = require("../models/GrammarFix");
const express = require("express");
// const router = require("express").Router();
const router = express.Router();

router.post("/grammarfix", auth, async (req, res) => {
  const reqBody = req.body;

  if (!reqBody.text || reqBody.text.length > 800) {
    return res.status(400).json({ message: "Invalid text length" });
  }
  try {
    const result = await fixGrammar(reqBody);

    // const correctedText = result[0]?.generated_text;
    // await GrammarFix.create({
    //   userId: req.user._id,
    //   inputText: text,
    //   correctedText,
    //   tone,
    // });

    res.json({ output: result });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ message: "AI service error", err: err.message });
  }
});

router.post("/daily-planner", auth, async (req, res) => {
  const reqBody = req.body;

  try {
    if (
      !reqBody.profession ||
      !reqBody.startWorkHours ||
      !reqBody.endWorkHours ||
      !reqBody.energyLevel
    ) {
      return res
        .status(400)
        .json({ message: "Invalid request, mandatory field is missing." });
    }

    const response = await dailyPlanner(reqBody);

    // const correctedText = result[0]?.generated_text;
    // await GrammarFix.create({
    //   userId: req.user._id,
    //   inputText: text,
    //   correctedText,
    //   tone,
    // });

    res.json({ output: response });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "AI service error", err: err.message });
  }
});

router.post("/explain-topic", auth, async (req, res) => {
  const reqBody = req.body;

  try {
    const response = await explainTopic(reqBody);

    // const correctedText = result[0]?.generated_text;
    // await GrammarFix.create({
    //   userId: req.user._id,
    //   inputText: text,
    //   correctedText,
    //   tone,
    // });

    res.json({ output: response });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "AI service error", err: err.message });
  }
});

module.exports = router;
