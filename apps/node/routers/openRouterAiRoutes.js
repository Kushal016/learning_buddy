const auth = require("../controllers/auth/middleware");
const callORAI = require("../controllers/open-router-ai-services/model-controller");
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
    Fix grammar of the following text.
    Keep the meaning same.
    Tone: ${tone || "neutral"}
    Text:${text}`;
  try {
    const result = await callORAI(process.env.OPEN_ROUTER_AI_MODEL, prompt);

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

module.exports = router;
