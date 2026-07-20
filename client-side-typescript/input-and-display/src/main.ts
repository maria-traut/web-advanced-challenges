const input = document.getElementById("nameInput") as HTMLInputElement;
const button = document.getElementById("submitBtn") as HTMLButtonElement;
const p = document.getElementById("displayName") as HTMLParagraphElement;

button.addEventListener("click", (event: MouseEvent) => {
  p.textContent = input.value;
});
