const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import database and models
require("./mongoDb.js");
const Email = require("./models/email");
const transporter = require("./config/nodemailerConfig");

// Initialize express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("frontend"));

// Route to handle form submission
app.post("/send-email", async (req, res) => {
  const { name, email, subject, description } = req.body;

  try {
    // Save to MongoDB
    const newEmail = new Email({ name, email, subject, description });
    await newEmail.save();

    // Email options
    const mailOptions = {
      from: "shashisahjnk12@gmail.com",
      to: email,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\nDescription:\n${description}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Error occurred while sending email.");
      }
      res.status(200).send("Email sent successfully!");
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Internal server error.");
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, "../Frontend")));

// Fallback for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
