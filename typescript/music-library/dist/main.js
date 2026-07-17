import { formatId } from "./types.js";
const libraryName = "Late Night Listening";
function describeTrack(title, artist) {
    return `${title} by ${artist}`;
}
const tracks = [
    { id: 1, title: "Blue Light", artist: "Jorja Smith", liked: true },
    { id: 2, title: "Nights", artist: "Frank Ocean", liked: false },
];
const pick = {
    id: 3,
    title: "Golden",
    artist: "Jill Scott",
    liked: true,
    curatedBy: "editorial",
    addedDate: "2024-01-15",
};
console.log(`Library: ${libraryName}`);
console.log(describeTrack(tracks[0].title, tracks[0].artist));
tracks.forEach((t) => console.log(formatId(t.id)));
console.log(`Featured: ${pick.title} — added ${pick.addedDate}`);
//# sourceMappingURL=main.js.map