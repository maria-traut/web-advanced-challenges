"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addSnippetFromForm } from "@/app/actions";

type FormValues = {
  title: string;
  language: string;
  description: string;
  code: string;
};

export function AddSnippetForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    await addSnippetFromForm(data);
    router.push("/snippets");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title", {
          required: "Snippet title is required",
          minLength: {
            value: 2,
            message: "Title must be at least 2 characters",
          },
        })}
        placeholder="Snippet title"
      />
      {errors.title && <p>{errors.title.message}</p>}

      <input
        {...register("language", {
          required: "Programming language is required",
          minLength: {
            value: 2,
            message: "Programming language must be at least 2 characters",
          },
        })}
        placeholder="Programming Language"
      />
      {errors.language && <p>{errors.language.message}</p>}

      <input
        {...register("description", {
          required: "Description is required",
          minLength: {
            value: 20,
            message: "Description must be at least 20 characters",
          },
        })}
        placeholder="Description"
      />
      {errors.description && <p>{errors.description.message}</p>}

      <input
        {...register("code", {
          required: "Code snippet is required",
          minLength: {
            value: 10,
            message: "Code snippet must be at least 10 characters",
          },
        })}
        placeholder="Code snippet"
      />
      {errors.code && <p>{errors.code.message}</p>}

      <button type="submit">Add snippet</button>
    </form>
  );
}

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
