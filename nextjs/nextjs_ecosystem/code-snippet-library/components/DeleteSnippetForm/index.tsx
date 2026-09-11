"use client";

import { removeSnippet } from "@/app/actions";

export default function DeleteSnippetForm({ id }: { id: number }) {
  return (
    <form action={removeSnippet}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" style={{ width: "auto" }}>
        X
      </button>
    </form>
  );
}
