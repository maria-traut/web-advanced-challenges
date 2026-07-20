import type { Book, SearchResult } from "./types";

const form = document.getElementById("search-form") as HTMLFormElement;
const input = document.getElementById("search-input") as HTMLInputElement;
const button = document.getElementById("search-button") as HTMLButtonElement;
const ul = document.getElementById("book-list") as HTMLUListElement;
const p = document.getElementById("displayName") as HTMLParagraphElement;

function renderBookList(books: Book[]) {
  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} by ${book.authors}`;
    ul.appendChild(li);
  });
}

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  const formElement = event.target as HTMLFormElement;
  const formData = new FormData(formElement);
  const dataObject = Object.fromEntries(formData.entries());
  const books = await fetchBooks(dataObject.query as string);
  ul.innerHTML = "";
  renderBookList(books);
});

export async function fetchBooks(term: string): Promise<Book[]> {
  const response = await fetch(`https://www.dbooks.org/api/search/${term}`);
  const data = (await response.json()) as SearchResult; // response with string assertion
  console.log("data", data); // object including array of books objects
  return data.books; // array of book objects
}
