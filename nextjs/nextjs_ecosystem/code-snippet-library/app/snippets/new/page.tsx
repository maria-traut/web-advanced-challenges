"use client";

import { AddSnippetForm } from "@/components/AddSnippetForm";
import Link from "next/link";

export default function NewSnippetPage() {
  return (
    <>
      <p>
        <Link href={"/"}>Homepage</Link>
      </p>
      <p>
        <Link href="/snippets">All Snippets</Link>
      </p>
      <AddSnippetForm />
    </>
  );
}
