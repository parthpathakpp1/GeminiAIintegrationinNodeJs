const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello ParthGemini");
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Value of Pie in Maths.";

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

// generate();

app.get("/api/content", async (req, res) => {
  try {
    const data = req.body.question;
    const result = await generate(data);
    res.send({
      result: result,
    });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT no ${PORT}`);
});
