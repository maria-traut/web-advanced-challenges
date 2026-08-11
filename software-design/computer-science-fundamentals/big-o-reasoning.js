// snippet 1
// O(1): Zugriff auf ein festes Element (arr[0]) – unabhängig von arr.length,
// da kein Loop nötig ist und keine anderen Elemente angefasst werden
function first(arr) {
  return arr[0];
}

// snippet 2
// O(n): eine einzelne Schleife läuft genau n-mal (einmal pro Element),
// die Anzahl der Schritte wächst linear mit arr.length
function second(arr) {
  let total = 0;
  for (const value of arr) {
    // n-mal, wächst mit array length
    total += value;
  }
  return total;
}
// snippet 3
// O(n²): äußere Schleife läuft n-mal, UND für jeden dieser Durchläufe
// läuft die innere Schleife nochmal n-mal (auch über arr) → n * n = n²
function third(arr) {
  for (const a of arr) {
    // n-mal, wächst mit array.length
    for (const b of arr) {
      // n-mal, wächst mit array.length
      if (a === b) console.log(a);
    }
  }
}

// snippet 4
// O(n): äußere Schleife läuft n-mal (wächst mit arr.length),
// innere Schleife läuft immer nur 10-mal – eine Konstante,
// unabhängig von arr.length. Konstanten fallen bei Big O weg,
// übrig bleibt nur der n-Faktor der äußeren Schleife
function fourth(arr) {
  for (const value of arr) {
    // n-mal, wächst mit array.length
    for (let i = 0; i < 10; i++) {
      // 10-mal, konstant, unabhängig von array.length
      console.log(value, i);
    }
  }
}

// snippet 5
// O(n log n): das Array wird bei jedem rekursiven Aufruf halbiert,
// das ergibt log n Rekursionsebenen (wie beim Splitting in Merge Sort).
// Auf jeder Ebene kopiert slice() + der Spread-Operator zusammen
// alle n Elemente neu (das kostet O(n) pro Ebene).
// log n Ebenen * O(n) Arbeit pro Ebene = O(n log n)
function fifth(arr) {
  if (arr.length <= 1) return arr; // einmalige prüfung
  const mid = Math.floor(arr.length / 2); // einmalige teilung
  return [...fifth(arr.slice(0, mid)), ...fifth(arr.slice(mid))]; // einmalige arary adaption mit zweimaligem aufruf
}
