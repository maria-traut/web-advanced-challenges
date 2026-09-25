"use server";

import type { TMessage } from "./types";
import openai from "@/lib/openai";
import { sql } from "@/lib/db";

// System prompt is prepended to every request, independent of the chat history in the client
// const systemPrompt = `You are a chef specializing in simple vegan recipes, written in flowery language. Answer the user's question clearly and briefly. Always suggest two or three follow-up questions the user might find useful.`;
const systemPrompt = `You are the game master of an interactive text adventure.

Rules:
- Narrate in the second person ("you"), in vivid but short paragraphs.

- Continue the story based only on the choice the player makes.
- End the adventure when the player reaches a natural conclusion or makes a fatal choice.`;

export async function sendChat(storyId: number, messages: TMessage[]) {
  const lastMessage = messages[messages.length - 1];

  if (lastMessage?.role === "user") {
    await addMessage(storyId, "user", lastMessage.content);
  }
  const storedMessages = await getMessages(storyId);

  const chatMessages = storedMessages.map((message) => ({
    role: message.role as TMessage["role"],
    content: message.content,
  }));

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: systemPrompt }, ...chatMessages],
    temperature: 0.5,
    max_tokens: 300,

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "text_adventure",
        strict: true,
        schema: {
          type: "object",
          properties: {
            story: { type: "string" },
            options: { type: "array", items: { type: "string" } },
            ended: { type: "boolean" },
          },
          required: ["story", "options", "ended"],
          additionalProperties: false,
        },
      },
    },
  });

  // const raw = completion.choices[0].message.content ?? "{}";
  const raw = completion.choices[0].message.content;

  if (!raw) {
    throw new Error("OpenAI returned an empty response");
  }

  const result = JSON.parse(raw);

  await addMessage(storyId, "assistant", result.story);

  return result;
}

export async function createStory(title: string) {
  const [story] = await sql`
  INSERT INTO stories (title)
  VALUES (${title})
  RETURNING *
  `;

  return story;
}

export async function addMessage(
  storyId: number,
  role: string,
  content: string,
) {
  const [message] = await sql`
  INSERT INTO messages (story_id, role, content)
    VALUES (${storyId}, ${role}, ${content})
    RETURNING *
  `;

  return message;
}

export async function getMessages(storyId: number) {
  return await sql`
   SELECT *
    FROM messages
    WHERE story_id = ${storyId}
    ORDER BY id ASC
  `;
}

export async function getStories() {
  return await sql`
  SELECT *
  FROM stories
  ORDER BY created DESC
  `;
}

// -- custom chat api --
// export async function sendChat(messages: TMessage[]) {
//   const completion = await openai.chat.completions.create({
//     // the chat completions endpoint
//     model: "gpt-4o-mini",
//     // System message is prepended here so it doesn't need to be carried in localStorage/client state

//     messages: [{ role: "system", content: systemPrompt }, ...messages],
//     temperature: 0.5, // controls how creative the model; lower value = more consistent, less "creatively random" responses
//     max_tokens: 300, // hard cap on response length, prevents runaway responses
//     // stream: true, // response arrives token by token instead of as one finished object
//     response_format: {
//       type: "json_schema", // forces structured JSON output instead of free-form text
//       json_schema: {
//         name: "chat_response", //  is an identifier shown in logs and error messages.
//         strict: true, // enforces the schema precisely: no extra keys, no missing keys.
//         schema: {
//           type: "object",
//           properties: {
//             reply: { type: "string" }, // reply holds the model’s answer to the user’s message.
//             followups: { type: "array", items: { type: "string" } }, //  is an array of strings the client can render as clickable suggestions.
//           },
//           required: ["reply", "followups"], // both fields must be present in every response
//           additionalProperties: false, // no fields other than reply/followups are allowed
//         },
//       },
//     },
//   });

// -- streaming --
// A ReadableStream is returned so the client can display the response progressively
// return new ReadableStream({
//   async start(controller) {
//     // for-await reads each chunk as soon as it arrives from OpenAI
//     for await (const chunk of stream) {
//       // delta.content holds this chunk's new text fragment; empty if the chunk only carries metadata
//       const token = chunk.choices[0].delta.content ?? ""; // every chunk contains a small text fragment in its delta.content
//       controller.enqueue(token); // inserts the current token/text fragment into the ReadableStream
//     }
//     controller.close(); // signals to the reader on the client side that the stream is done
//   },
// });
