"use strict";
const decreaseButton = document.getElementById("decreaseBtn");
const increaseButton = document.getElementById("increaseBtn");
const span = document.getElementById("counter");
let counter = 0;
decreaseButton.addEventListener("click", (event) => {
    counter--;
    span.textContent = counter.toString();
});
increaseButton.addEventListener("click", (event) => {
    counter++;
    span.textContent = counter.toString();
});
//# sourceMappingURL=main.js.map