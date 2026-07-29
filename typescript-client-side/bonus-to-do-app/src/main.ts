const input = document.getElementById("todoInput") as HTMLInputElement;
const button = document.getElementById("addTodo") as HTMLButtonElement;
const ol = document.getElementById("todoList") as HTMLOListElement;

button.addEventListener("click", (event: MouseEvent) => {
  const li = document.createElement("li");
  li.textContent = input.value;

  const buttonDelete = document.createElement("button");
  buttonDelete.textContent = "Delete";

  buttonDelete.addEventListener("click", (event: MouseEvent) => {
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
