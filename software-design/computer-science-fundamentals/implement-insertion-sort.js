function insertionSort(arr) {
  let comparisons = 0;

  // äußere Schleife: startet bei Index 1 (nicht 0), da ein einzelnes
  // Element (arr[0]) allein automatisch sortiert ist
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
// { sorted: [ 1, 2, 3, 4, 5, 6 ], comparisons: 12 }
// O(n²) -> Jedes Element braucht im Schnitt immer mehr Vergleiche, je weiter man im Array ist: Element bei Index 1 braucht 1 Vergleich, Element bei Index 2 braucht 2 Vergleiche, Element bei Index 3 braucht 3 Vergleiche, Element bei Index n-1 braucht n-1 Vergleiche.

console.log(insertionSort([1, 2, 3, 4, 5])); // -> { sorted: [ 1, 2, 3, 4, 5 ], comparisons: 4 }
// O(n) -> Bereits sortiertes Array: jedes Element braucht genau 1 Vergleich (der sofort false ergibt, Schleife bricht ab). Bei n Elementen: n - 1 ≈ n Vergleiche insgesamt. Das ist linear: verdoppelt man n, verdoppelt sich auch die Vergleichsanzahl. Kein Wachstum über das Verhältnis 1:1 hinaus.
console.log(insertionSort([5, 4, 3, 2, 1])); // -> { sorted: [ 1, 2, 3, 4, 5 ], comparisons: 10 }
console.log(insertionSort([42])); // -> { sorted: [ 42 ], comparisons: 0 }
console.log(insertionSort([])); // -> { sorted: [], comparisons: 0 }

// pseudo code
/*
for i from 1 to length(arr) - 1:
  current = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > current:
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = current
  */
