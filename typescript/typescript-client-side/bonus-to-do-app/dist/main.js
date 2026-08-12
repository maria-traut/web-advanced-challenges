"use strict";
const input = document.getElementById("todoInput");
const button = document.getElementById("addTodo");
const ol = document.getElementById("todoList");
button.addEventListener("click", (event) => {
    const li = document.createElement("li");
    li.textContent = input.value;
    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.addEventListener("click", (event) => {
        li.remove();
    });
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", (event) => {
        checkbox.checked
            ? (li.style.textDecoration = "line-through")
            : (li.style.textDecoration = "none");
    });
    ol.appendChild(li);
    li.appendChild(checkbox);
    li.appendChild(buttonDelete);
    input.value = "";
});
//# sourceMappingURL=main.js.map