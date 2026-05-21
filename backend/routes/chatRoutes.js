const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

const chatsFile = path.join(__dirname, "../data/chats.json");

router.post("/send", auth, async (req, res) => {

  try {

    const { message } = req.body;

    const chats = JSON.parse(
      fs.readFileSync(chatsFile)
    );

    // REAL AI RESPONSE

    const aiRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const botResponse =
      aiRes.data.choices[0].message.content;

    const newChat = {
      userId: req.user.id,
      message,
      response: botResponse,
      createdAt: new Date()
    };

    chats.push(newChat);

    fs.writeFileSync(
      chatsFile,
      JSON.stringify(chats, null, 2)
    );

    res.json(newChat);

  } catch (err) {

    console.log(err.response?.data || err);

    res.status(500).json({
      msg: "AI Error"
    });

  }

});

module.exports = router;