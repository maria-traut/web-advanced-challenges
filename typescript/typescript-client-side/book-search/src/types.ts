export interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  image: string;
  url: string;
}

export interface SearchResult {
  status: string;
  total: string;
  books: Book[];
}
