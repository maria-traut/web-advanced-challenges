const input = document.getElementById("itemInput") as HTMLInputElement;
const button = document.getElementById("addBtn") as HTMLButtonElement;
const ul = document.getElementById("itemList") as HTMLUListElement;

button.addEventListener("click", (event: MouseEvent) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  li.textContent = input.value;
  buttonDelete.textContent = `Delete Item`;
  buttonDelete.addEventListener("click", (event: MouseEvent) => {
    li.remove();
  });
  ul.appendChild(li);
  li.appendChild(buttonDelete);
});
