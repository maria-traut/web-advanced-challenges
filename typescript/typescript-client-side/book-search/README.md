# Code Along - Book Search

Build a small book search app that queries the Open Library API and renders results in the browser. Each step adds to the same project.

# Setup

Create a project with the following structure:

book-search/
index.html
src/
main.ts
tsconfig.json

Add this HTML to index.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Book Search</title>
  </head>
  <body>
    <form id="search-form">
      <input name="query" type="text" placeholder="Enter a book title" />
      <button>Search</button>
    </form>
    <ul id="book-list"></ul>
  </body>
</html>
```

# Step 1: Configure TypeScript for the browser

Write a tsconfig.json with:
lib: ["dom", "esnext"], so document and other browser globals are recognized
ESNext as both target and module
Add a <script type="module"> tag to index.html that loads dist/main.js.

To test: write console.log("ready") in src/main.ts, run tsc, open index.html with http-server, live-preview via vscode or another static file server of your choice.

# Step 2: Select and type DOM elements

Select the form and list from the HTML using document.getElementById. Assert each to the correct element-specific type.

# Step 3: Listen for the search event

Add a "submit" listener to the form. In the callback, annotate the event parameter with the correct submit event type.
Prevent the default form submission, and extract the form element from event.target. Assert it to HTMLFormElement.
Retrieve the input value by using FormData. Either use get("query"), or use Object.fromEntries to iterate over the form data.
Log the input value to the console.

Run tsc, reload the browser, type something, click the button, and check the console.

# Step 4: Define a data shape and fetch books

The DBooks API search endpoint returns JSON like this:

```js
{
  "status": "ok",
  "total": "87",
  "books": [
    {
      "id": "3030168778",
      "title": "Programming for Computations - Python",
      "subtitle": "A Gentle Introduction to Numerical Simulations with Python 3.6",
      "authors": "Svein Linge, Hans Petter Langtangen",
      "image": "https://www.dbooks.org/img/books/3030168778s.jpg",
      "url": "https://www.dbooks.org/programming-for-computations-python-3030168778/"
    }
  ]
}
```

Define two interfaces: Book for a single entry and SearchResult for the full response, which wraps the book array under books.

Write an async function fetchBooks(term: string): Promise<Book[]>. It should fetch from https://www.dbooks.org/api/search/{query} and return the parsed docs with a type assertion.

Call it from the click handler. For each book, add an <li> to the book-list element showing the title and first author name.
