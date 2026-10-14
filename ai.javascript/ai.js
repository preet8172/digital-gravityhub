import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI();

async function askAI(prompt) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });
  console.log(completion.choices[0].message.content);
}

askAI("Explain how JavaScript works in one sentence.");
