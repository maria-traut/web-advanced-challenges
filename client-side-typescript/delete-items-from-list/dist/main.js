"use strict";
const input = document.getElementById("itemInput");
const button = document.getElementById("addBtn");
const ul = document.getElementById("itemList");
button.addEventListener("click", (event) => {
    const li = document.createElement("li");
    const buttonDelete = document.createElement("button");
    li.textContent = input.value;
    buttonDelete.textContent = `Delete Item`;
    buttonDelete.addEventListener("click", (event) => {
        li.remove();
    });
    ul.appendChild(li);
    li.appendChild(buttonDelete);
});
//# sourceMappingURL=main.js.map