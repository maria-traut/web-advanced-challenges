"use client";

import { useState } from "react";
import Link from "next/link";
import { Snippet } from "@/lib/services/snippetsService";

export default function SnippetFilter({ snippets }: { snippets: Snippet[] }) {
  const [language, setLanguage] = useState("all");

  const visible =
    language === "all"
      ? snippets
      : snippets.filter((snippet) => snippet.language === language);

  return (
    <>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        <option value="all">All</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
        <option value="TypeScript">TypeScript</option>
      </select>
      <ul>
        {visible.map((snippet) => (
          <li key={snippet.id}>
            <Link href={`/snippets/${snippet.id}`}>
              {snippet.title}: {snippet.description} ({snippet.language})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
