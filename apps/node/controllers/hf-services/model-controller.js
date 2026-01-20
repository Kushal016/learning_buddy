const axios = require("axios");

const callHF = async (model, prompt) => {
  console.log("model", `${process.env.HF_URI}/models/${model}`);
  try {
    const response = await axios.post(
      `${process.env.HF_URI}/models/vennify/t5-base-grammar-correction`,
      { input: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
        timeout: 60000,
      },
    );
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = callHF;
