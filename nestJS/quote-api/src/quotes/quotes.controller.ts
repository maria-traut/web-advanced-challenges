import { Controller, Get, Query } from "@nestjs/common";
import { QuoteService } from "./quotes.service";

@Controller() // no parameter nessacary for root; "/admin" if admin route
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get("/")
  showHello() {
    return this.quoteService.generateMessage();
  }

  @Get("/quotes")
  showAllQuotes() {
    return this.quoteService.getAllQuotes();
  }

  @Get("/quotes/random")
  showRandomQuote() {
    return this.quoteService.getRandomQuote();
  }

  @Get("/quotes/authors")
  showAllAuthors() {
    return this.quoteService.getAllAuthors();
  }

  @Get("/quotes/filtered")
  filterQuotesByAuthor(@Query("author") author: string) {
    return this.quoteService.getQuotesByAuthor(author);
  }
}
