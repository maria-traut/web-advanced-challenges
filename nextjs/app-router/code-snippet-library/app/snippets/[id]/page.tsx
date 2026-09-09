import Link from "next/link";
import { getSnippetById } from "@/lib/services/snippetsService";

export default async function ({ params }: PageProps<"/snippets/[id]">) {
  const { id } = await params;
  const snippet = getSnippetById(Number(id));

  if (!snippet) {
    throw new Error(`Snippet ${id} not found.`);
  }
  return (
    <>
      <Link href={"/"}>Homepage</Link>
      <Link href="/snippets">&#8592; Show all snippets</Link>
      <h2>{snippet.title}</h2>
      <p>Language: {snippet.language}</p>
      <p>{snippet.description}</p>
      <pre>
        <code>{snippet.code}</code>
      </pre>
    </>
  );
}
