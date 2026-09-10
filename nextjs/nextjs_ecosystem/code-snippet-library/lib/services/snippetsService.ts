import sql from "@/lib/db";

export type Snippet = {
  id: number;
  title: string;
  language: string;
  description: string;
  code: string;
};

export async function getAllSnippets(): Promise<Snippet[]> {
  return sql<Snippet[]>`SELECT * FROM snippets`;
}

export async function getSnippetById(id: number): Promise<Snippet | null> {
  const [snippet] = await sql<
    Snippet[]
  >`SELECT * FROM snippets WHERE id = ${id}`;
  return snippet ?? null;
}

export async function createSnippet(
  snippet: Omit<Snippet, "id">,
): Promise<Snippet> {
  const [created] = await sql<
    Snippet[]
  >`INSERT INTO snippets (title, language, description, code)
    VALUES (${snippet.title}, ${snippet.language}, ${snippet.description}, ${snippet.code})
    RETURNING *`;
  return created;
}
