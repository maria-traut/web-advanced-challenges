function insertionSort(arr) {
  let comparisons = 0;

  // äußere Schleife: startet bei Index 1 (nicht 0), da ein einzelnes
  // Element (arr[0]) allein automatisch "sortiert" ist
  for (let i = 1; i < arr.length; i++) {
    // current merkt sich den Wert, der gerade einsortiert werden soll –
    // wichtig, ihn VOR dem Verschieben zu speichern, da arr[i] gleich
    // überschrieben wird
    let current = arr[i];

    // j startet direkt links neben current und wandert beim Schieben
    // weiter nach links, bis die richtige Position gefunden ist
    let j = i - 1;

    while (j >= 0) {
      comparisons++; // wir vergleichen jetzt arr[j] mit current

      if (arr[j] > current) {
        arr[j + 1] = arr[j]; // schieben
        j--; // weiter nach links
      } else {
        break; // richtige Stelle gefunden, Schleife verlassen
      }
    }

    arr[j + 1] = current;
  }

  // gibt das (mutierte) Original-Array zurück, jetzt aufsteigend sortiert
  return { sorted: arr, comparisons };
}

console.log(insertionSort([5, 2, 4, 6, 1, 3]));
// → [1, 2, 3, 4, 5, 6]

console.log(insertionSort([1, 2, 3, 4, 5])); // -> [ 1, 2, 3, 4, 5 ]
console.log(insertionSort([5, 4, 3, 2, 1])); // -> [ 1, 2, 3, 4, 5 ]
console.log(insertionSort([42])); // -> [ 42 ]
