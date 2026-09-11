"use client";

import { useState } from "react";
import Link from "next/link";
import { Snippet } from "@/lib/services/snippetsService";
import DeleteSnippetForm from "../DeleteSnippetForm";

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
              <h2>
                {snippet.title} ({snippet.language})
              </h2>
              <p>{snippet.description}</p>
            </Link>
            <DeleteSnippetForm id={snippet.id} />
          </li>
        ))}
      </ul>
    </>
  );
}
