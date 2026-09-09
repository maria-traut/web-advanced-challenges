import Link from "next/link";
import { getAllSnippets } from "@/lib/services/snippetsService";

export default async function SnippetsPage() {
  const snippets = getAllSnippets();
  return (
    <>
      <Link href={"/"}>Homepage</Link>
      <h2>All Snippets</h2>
      {snippets.map((snippet) => (
        <article key={snippet.id}>
          <h3>
            <Link href={`/snippets/${snippet.id}`}>{snippet.title}</Link>
          </h3>
          <p>Language: {snippet.language}</p>
          <p>{snippet.description}</p>
          <pre>
            <code>{snippet.code}</code>
          </pre>
        </article>
      ))}
    </>
  );
}
