import Link from "next/link";
import { getSnippetById } from "@/lib/services/snippetsService";

export default async function ({ params }: PageProps<"/snippets/[id]">) {
  const { id } = await params;
  const snippet = await getSnippetById(Number(id));

  if (!snippet) {
    throw new Error(`Snippet ${id} not found.`);
  }
  return (
    <>
      <p>
        <Link href={"/"}>Homepage</Link>
      </p>
      <p>
        <Link href="/snippets">All snippets</Link>
      </p>
      <h2>{snippet.title}</h2>
      <p>{snippet.language}</p>
      <p>{snippet.description}</p>
      <pre>
        <code>{snippet.code}</code>
      </pre>
    </>
  );
}
