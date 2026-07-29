"use strict";
const textarea = document.getElementById("textInput");
const p = document.getElementById("charCount");
let charCount = 0;
textarea.addEventListener("input", (event) => {
    textarea.value.length !== 1
        ? (p.textContent = `${textarea.value.length} characters`)
        : (p.textContent = `1 character`);
});
//# sourceMappingURL=main.js.map