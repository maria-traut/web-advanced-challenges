import type { Book, SearchResult } from "./types";

// console.log("ready");

const form = document.getElementById("search-form") as HTMLFormElement;
const input = document.getElementById("input") as HTMLInputElement;
const button = document.getElementById("search-button") as HTMLButtonElement;
const ul = document.getElementById("book-list") as HTMLUListElement;

/*
<form id="search-form">
    <input name="query" type="text" placeholder="Enter a book title" />
    <button>Search</button>
</form>
<ul id="book-list"></ul>
*/

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  const formElement = event.target as HTMLFormElement;
  const formData = new FormData(formElement);
  const dataObject = Object.fromEntries(formData.entries());
  console.log("data object", dataObject);

  const books = await fetchBooks(dataObject.query as string);
  console.log("books", books);

  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} by ${book.authors}`;
    ul.appendChild(li);
  });
});

export async function fetchBooks(term: string): Promise<Book[]> {
  const formattedTerm = term.replace(/ /g, "+");
  const response = await fetch(
    `https://www.dbooks.org/api/search/${formattedTerm}`,
  );
  const data = (await response.json()) as SearchResult; // response with string assertion
  return data.books; // array of book objects
}

/*
Step 4: Define a data shape and fetch books
The DBooks API search endpoint returns JSON like this:

Define two interfaces: Book for a single entry and SearchResult for the full response, which wraps the book array under books.

Write an async function fetchBooks(term: string): Promise<Book[]>. It should fetch from https://www.dbooks.org/api/search/{query} and return the parsed docs with a type assertion.

Call it from the click handler. For each book, add an <li> to the book-list element showing the title and first author name.
*/
