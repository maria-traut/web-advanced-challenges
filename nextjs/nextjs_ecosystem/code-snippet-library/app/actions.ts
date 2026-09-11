"use server";

import { createSnippet, deleteSnippet } from "@/lib/services/snippetsService";
import { revalidatePath } from "next/cache";

export async function addSnippet(snippet: {
  title: string;
  language: string;
  description: string;
  code: string;
}) {
  await createSnippet(snippet);
  revalidatePath("/snippets");
}

export async function removeSnippet(formData: FormData) {
  const id = formData.get("id") as string;
  await deleteSnippet(id);
  revalidatePath("/snippets");
}
