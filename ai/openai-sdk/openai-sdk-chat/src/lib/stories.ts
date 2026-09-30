import type { TransactionSql } from "postgres";
import type { TRole } from "@/app/types";
import { sql } from "@/lib/db";

export async function addMessage(
  storyId: number,
  role: TRole,
  content: string,
  database: typeof sql | TransactionSql = sql,
) {
  const [message] = await database`
  INSERT INTO messages (story_id, role, content)
    VALUES (${storyId}, ${role}, ${content})
    RETURNING *
  `;

  return message;
}

// Saves the user message and the model reply together: both or neither.
export async function saveTurn(
  storyId: number,
  userContent: string | undefined,
  assistantContent: string,
) {
  await sql.begin(async (transaction) => {
    if (userContent !== undefined) {
      await addMessage(storyId, "user", userContent, transaction);
    }
    await addMessage(storyId, "assistant", assistantContent, transaction);
  });
}
