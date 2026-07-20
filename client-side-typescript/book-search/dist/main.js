const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const ul = document.getElementById("book-list");
const p = document.getElementById("displayName");
function renderBookList(books) {
    books.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = `${book.title} by ${book.authors}`;
        ul.appendChild(li);
    });
}
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);
    const dataObject = Object.fromEntries(formData.entries());
    const books = await fetchBooks(dataObject.query);
    ul.innerHTML = "";
    renderBookList(books);
});
export async function fetchBooks(term) {
    const response = await fetch(`https://www.dbooks.org/api/search/${term}`);
    const data = (await response.json()); // response with string assertion
    console.log("data", data); // object including array of books objects
    return data.books; // array of book objects
}
//# sourceMappingURL=main.js.map