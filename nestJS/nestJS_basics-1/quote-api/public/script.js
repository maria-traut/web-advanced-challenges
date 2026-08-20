const quotesContainer = document.getElementById("quotes-container");

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3232/quotes");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function renderQuotes() {
  const quotes = await fetchData();
  quotes.forEach((quote) => {
    const listItem = document.createElement("li");
    const quoteP = document.createElement("p");
    quoteP.textContent = quote.quote;
    const quoteAuthor = document.createElement("span");
    quoteAuthor.textContent = quote.author;
    quotesContainer.append(listItem);
    listItem.append(quoteP, quoteAuthor);
  });
}

renderQuotes();
