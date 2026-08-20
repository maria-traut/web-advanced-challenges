import { Injectable } from "@nestjs/common";
import { quotes } from "./quotes.data";

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

@Injectable()
export class QuoteService {
  private quotes = quotes;

  generateMessage(): string {
    return "Welcome to my fabulous Quote App!";
  }

  getAllQuotes() {
    return this.quotes;
  }

  getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[randomIndex];
  }

  getAllAuthors() {
    const authors = this.quotes.map((quote) => quote.author).sort(); // duplicates included
    const uniqueAuthors = new Set(authors); // duplicates removed
    return Array.from(uniqueAuthors); // array built
  }

  getQuotesByAuthor(author: string): Quote[] {
    return this.quotes.filter((quote) => quote.author === author);
  }
}

/* longer versions with map method:

  getAllQuotes(): void[] {
    if (!quotes) {
      throw new Error("No quotes found.");
    }
    return quotes.map((quote) => {
      (quote.id, quote.quote, quote.author);
    });
  }

   getQuotesByAuthor(author: string): string[] {
    const filteredQuotes = this.quotes
      .filter((quote) => quote.author === author)
      .map((quote) => quote.quote);
    return filteredQuotes;
  }
    */
