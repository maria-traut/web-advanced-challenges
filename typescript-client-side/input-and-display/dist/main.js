"use strict";
const input = document.getElementById("nameInput");
const button = document.getElementById("submitBtn");
const p = document.getElementById("displayName");
button.addEventListener("click", (event) => {
    p.textContent = input.value;
});
//# sourceMappingURL=main.js.map