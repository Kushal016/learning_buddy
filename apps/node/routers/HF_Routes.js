const auth = require("../controllers/auth/middleware");
const callHF = require("../controllers/hf-services/model-controller");
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
    console.log(prompt);

    const result = await callHF("google/flan-t5-base", prompt);
    console.log("result", result);

    const correctedText = result[0]?.generated_text;
    await GrammarFix.create({
      userId: req.user._id,
      inputText: text,
      correctedText,
      tone,
    });

    res.json({ correctedText });
  } catch (err) {
    res.status(500).json({ message: "AI service error" });
  }
});

module.exports = router;
