"use strict";
const input = document.getElementById("itemInput");
const button = document.getElementById("addBtn");
const ul = document.getElementById("itemList");
button.addEventListener("click", (event) => {
    const li = document.createElement("li");
    li.textContent = input.value;
    ul.appendChild(li);
});
//# sourceMappingURL=main.js.map