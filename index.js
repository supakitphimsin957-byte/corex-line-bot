const express = require("express");
const line = require("@line/bot-sdk");
require("dotenv").config();

const app = express();

// config LINE
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// webhook route
app.post("/webhook", line.middleware(config), async (req, res) => {
  try {
    const events = req.body.events;

    for (let event of events) {
      if (event.type === "message" && event.message.type === "text") {
        const replyText = `คุณพิมพ์ว่า: ${event.message.text}`;

        await client.replyMessage(event.replyToken, {
          type: "text",
          text: replyText,
        });
      }
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

// LINE client
const client = new line.Client(config);

// start server
app.listen(3000, () => {
  console.log("🚀 LINE Bot running at http://localhost:3000");
});
