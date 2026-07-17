import { formatFilm, getUnwatched } from "./types.js";
const movie1 = {
    id: 1,
    title: "Past Lives",
    year: 2023,
    watched: true,
    rating: 5,
};
const movie2 = {
    id: 2,
    title: "Poor Things",
    year: 2023,
    watched: false,
};
const movie3 = {
    id: 3,
    title: "The Zone of Interest",
    year: 2023,
    watched: true,
    rating: 4,
};
const movie4 = {
    id: 4,
    title: "Anatomy of a Fall",
    year: 2023,
    watched: false,
};
const myWatchlist = {
    name: "My Watchlist",
    films: [movie1, movie2, movie3, movie4],
};
console.log(formatFilm(movie1));
console.log(formatFilm(movie2));
console.log(formatFilm(movie3));
console.log(formatFilm(movie4));
console.log(getUnwatched(myWatchlist));
//# sourceMappingURL=main.js.map