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
        stream: true,
      }),
    },
  );

  return new ReadableStream({
    async start(controller) {
      const reader = openaiResponse.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.replace("data:", "").trim();
          if (data === "[DONE]") continue;

          const token = JSON.parse(data).choices[0].delta.content;
          if (token) controller.enqueue(token);
        }
      }
      controller.close();
    },
  });

  // const data = await openaiResponse.json();

  // if (!openaiResponse.ok || !data.choices) {
  //   console.error("OpenAI API error:", data);
  //   throw new Error(data.error?.message ?? "Unknown error from OpenAI API");
  // }

  // return data.choices[0].message;
}
