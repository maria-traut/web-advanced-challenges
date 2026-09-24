"use server";

import type { TMessage } from "./types";

export async function sendChat(messages: TMessage[]) {
  //   console.log("API Key loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");
  //   console.log("API Key value:", process.env.OPENAI_API_KEY);
  const openaiResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
      }),
    },
  );

  const data = await openaiResponse.json();

  if (!openaiResponse.ok || !data.choices) {
    console.error("OpenAI API error:", data);
    throw new Error(data.error?.message ?? "Unknown error from OpenAI API");
  }

  return data.choices[0].message;
}
