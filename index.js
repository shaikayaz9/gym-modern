import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/email.js";

const app = express();
config({ path: "./config.env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  res.send("server started bro , Chill")
})

app.post("/send/mail", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all details" });
    }

    await sendEmail({
      email: "shaikayaz0564@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });

    res
      .status(200)
      .json({ success: true, message: "Message Sent Successfully." });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
