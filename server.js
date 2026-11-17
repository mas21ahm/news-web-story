require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { JSDOM } = require("jsdom");
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Alternative: If you want to use a public folder, uncomment this and move your files to a 'public' folder
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

app.post('/generate', async (req, res) => {
 try {
   const { url } = req.body;
   const html = await axios.get(url);
   const dom = new JSDOM(html.data);
   const articleText = dom.window.document.body.textContent;

   const prompt = `Write a compelling 120-200 word relavant and exact summary of this article. Write it as one continuous narrative without any card numbers, labels, or formatting. Use engaging storytelling language with complete sentences and proper punctuation. Make it flow naturally as one cohesive story:\n\n${articleText}`;
   const result = await model.generateContent(prompt);
   let story = result.response.text().replace(/\n/g, ' ').trim();
   
   // Clean up any unwanted formatting or card references
   story = story.replace(/Card \d+\/\d+:/gi, '');
   story = story.replace(/Card \d+:/gi, '');
   story = story.replace(/\*\*/g, '');
   story = story.replace(/Here's a story summary[^:]*:/gi, '');
   story = story.trim();

   res.json({ story });
 } catch (error) {
   console.error(error.message);
   res.status(500).json({ error: "Failed to generate story" });
 }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));