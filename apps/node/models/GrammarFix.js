const mongoose = require("mongoose");

const grammarFixSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  inputText: String,
  correctedText: String,
  tone: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GrammarFix", grammarFixSchema);
