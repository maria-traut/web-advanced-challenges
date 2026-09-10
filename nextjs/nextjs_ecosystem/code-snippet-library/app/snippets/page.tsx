import Link from "next/link";
import { getAllSnippets } from "@/lib/services/snippetsService";
import SnippetFilter from "@/components/SnippetFilter";

export default async function SnippetsPage() {
  const snippets = await getAllSnippets();
  return (
    <>
      <p>
        <Link href={"/"}>Homepage</Link>
      </p>
      <p>
        <Link href={"/snippets/new"}>+ New Snippet</Link>
      </p>
      <h2>All Snippets</h2>
      <SnippetFilter snippets={snippets} />
    </>
  );
}
