"use server";

import { createSnippet } from "@/lib/services/snippetsService";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addSnippet(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const language = formData.get("language") as string;
  const description = formData.get("description") as string;
  const code = formData.get("code") as string;

  await createSnippet({ title, language, description, code });
  revalidatePath("/snippets");
}

export async function addSnippetFromForm(snippet: {
  title: string;
  language: string;
  description: string;
  code: string;
}) {
  await createSnippet(snippet);
  revalidatePath("/snippets");
}
