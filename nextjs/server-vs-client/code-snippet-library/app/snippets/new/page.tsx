"use client";

import Link from "next/link";
import { addSnippet } from "@/app/actions";

export default function NewSnippetPage() {
  return (
    <>
      <p>
        <Link href={"/"}>Homepage</Link>
      </p>
      <p>
        <Link href="/snippets">All Snippets</Link>
      </p>
      <form action={addSnippet}>
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="language" placeholder="Lanuage" required />
        <input
          type="text"
          name="description"
          placeholder="Description"
          required
        />
        <input type="text" name="code" placeholder="Code" required />
        <button type="submit">Create snippet</button>
      </form>
    </>
  );
}
