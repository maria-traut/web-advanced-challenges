import type { TRole } from "@/app/types";
import { sql } from "@/lib/db";

export async function addMessage(
  storyId: number,
  role: TRole,
  content: string,
) {
  const [message] = await sql`
  INSERT INTO messages (story_id, role, content)
    VALUES (${storyId}, ${role}, ${content})
    RETURNING *
  `;

  return message;
}
