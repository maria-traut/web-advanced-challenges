const input = document.getElementById("itemInput") as HTMLInputElement;
const button = document.getElementById("addBtn") as HTMLButtonElement;
const ul = document.getElementById("itemList") as HTMLUListElement;

button.addEventListener("click", (event: MouseEvent) => {
  const li = document.createElement("li");
  li.textContent = input.value;
  ul.appendChild(li);
});
