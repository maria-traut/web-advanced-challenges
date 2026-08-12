export function formatFilm(film) {
    return film.rating
        ? `${film.title} from ${film.year} has a rating of ${film.rating}.`
        : `${film.title} is from ${film.year}.`;
}
export function getUnwatched(playlist) {
    return playlist.films.filter((film) => film.watched === false);
}
//# sourceMappingURL=types.js.map