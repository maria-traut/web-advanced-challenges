// challenge 1
type Book = {
  id: number;
  title: string;
  author_name: string;
  added_at: number;
  is_available: boolean;
};

const books: Book[] = [
  {
    id: 1,
    title: "Keyboard",
    author_name: "KeyboardAuthor",
    added_at: 9900,
    is_available: true,
  },
  {
    id: 2,
    title: "Mouse",
    author_name: "MouseAuthor",
    added_at: 4900,
    is_available: false,
  },
  {
    id: 3,
    title: "Monitor",
    author_name: "MonitorAuthor",
    added_at: 19900,
    is_available: true,
  },
];

const filteredBooks = books
  .filter((book) => book.is_available)
  .map((book) => ({
    id: book.id,
    title: book.title,
    authorName: book.author_name,
    addedAt: book.added_at,
  }));

console.log(filteredBooks);

// challenge 2
class BookReservation {
  memberName: string;
  bookTitle: string;
  #status: "reserved" | "returned" | "cancelled";

  constructor(memberName: string, bookTitle: string) {
    this.memberName = memberName;
    this.bookTitle = bookTitle;
    this.#status = "reserved";
  }

  get status() {
    return this.#status;
  }

  markReturned(): void {
    if (this.#status === "returned" || this.#status === "cancelled") {
      throw new Error("Return rejected.");
    }
    this.#status = "returned";
  }

  cancel(): void {
    if (this.#status === "returned" || this.#status === "cancelled") {
      throw new Error("Cancelling rejected.");
    }
    this.#status = "cancelled";
  }
}

const bookReservation1 = new BookReservation("Anna", "Lord of the Rings 1");
const bookReservation2 = new BookReservation("Maria", "Lord of the Rings 2");
bookReservation1.markReturned();
// bookReservation1.markReturned(); --> Error Testing
bookReservation2.markReturned();
// bookReservation2.cancel(); --> Error Testing
console.log(bookReservation1.status);
console.log(bookReservation2.status);
