// ---------------------------------------------------------
// Challenge 1: Functional transformation in a service layer
// ---------------------------------------------------------
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

// --------------------------------------
// Challenge 2: Book Library Reservations
// --------------------------------------
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
console.log(bookReservation1.status); // Output: "returned"
console.log(bookReservation2.status); // Output: "returned"

// ---------------------------------------------
// Challenge 3: Book Library Notification System
// ---------------------------------------------

// The Notifiable interface must declare:

interface Notifiable {
  // interface = contract (list of promises; every class that uses Notifiable, must use the two declared methods.)
  notify(memberId: string, event: string, title: string): void; // sends a notification to a member
  getChannelName(): string; // returns the name of the channel (e.g. "email")
}

// The BaseNotifier abstract class must implement Notifiable and provide ...
abstract class BaseNotifier implements Notifiable {
  formatMessage(event: "reservation" | "overdue", title: string): string {
    if (event === "overdue") {
      return `Reminder: '${title}' is overdue.`;
    } else {
      return `Your reservation for '${title}' is confirmed.`;
    }
  }
  abstract send(memberId: string, message: string): void;
  abstract getChannelName(): string;

  notify(
    memberId: string,
    event: "reservation" | "overdue",
    title: string,
  ): void {
    const message = this.formatMessage(event, title);
    this.send(memberId, message);
  }
}

// Two concrete classes extending BaseNotifier ...
class EmailNotifier extends BaseNotifier {
  send(memberId: string, message: string): void {
    console.log(`Sending email to member #${memberId}: ${message}`);
  }
  getChannelName(): string {
    return `email`;
  }
}

class SmsNotifier extends BaseNotifier {
  send(memberId: string, message: string): void {
    console.log(`Sending SMS to member #${memberId}: ${message}`);
  }
  getChannelName(): string {
    return `sms`;
  }
}

// A NotificationService class that ...
class NotificationService {
  channels: Notifiable[];

  constructor(channels: Notifiable[]) {
    this.channels = channels;
  }

  dispatch(
    memberId: string,
    event: "reservation" | "overdue",
    title: string,
  ): void {
    this.channels.forEach((channel) => {
      channel.notify(memberId, event, title);
    });
  }
}

// emailNotifier = Instanz (Object, das ich mit new ... erzeuge); EmailNotifier = Klasse
const emailNotifier = new EmailNotifier();
const smsNotifier = new SmsNotifier();

const notificationService = new NotificationService([
  emailNotifier,
  smsNotifier,
]);

notificationService.dispatch("42", "reservation", "Dune");
// Output:
// "Sending email to member #42: Your reservation for 'Dune' is confirmed."
// "Sending SMS to member #42: Your reservation for 'Dune' is confirmed."
