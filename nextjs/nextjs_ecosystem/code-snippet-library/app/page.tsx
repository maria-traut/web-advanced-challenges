import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>
        <Link href="/snippets">All Snippets</Link>
      </p>
      <p>
        <Link href={"/snippets/new"}>+ New Snippet</Link>
      </p>
    </>
  );
}
