import { getSnippetById } from "@/lib/services/snippetsService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const snippet = await getSnippetById(Number(id));

  if (!snippet) {
    return Response.json({ error: "Snippet not found" }, { status: 404 });
  }

  return Response.json(snippet);
}
