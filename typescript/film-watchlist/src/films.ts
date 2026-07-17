interface Watchable {
  readonly id: number;
  title: string;
  year: number;
}

interface Film extends Watchable {
  watched: boolean;
  rating?: 1 | 2 | 3 | 4 | 5;
}

interface Playlist {
  name: string;
  films: string[];
}

const films: Film[] = [
  { id: 1, title: "Past Lives", year: 2023, watched: true, rating: 5 },
  { id: 2, title: "Poor Things", year: 2023, watched: false },
  {
    id: 3,
    title: "The Zone of Interest",
    year: 2023,
    watched: true,
    rating: 4,
  },
  { id: 4, title: "Anatomy of a Fall", year: 2023, watched: false },
];

function formatFilm(film: Film): string {
  return film.rating
    ? `${film.title} from ${film.year} has a rating of ${film.rating}.`
    : `${film.title} from ${film.year}`;
}

function getUnwatched(playlist: Playlist): Film[] {
  return playlist.films.filter((film) => film.watched === false);
}

console.log(getUnwatched(films));
