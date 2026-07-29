const button = document.getElementById("helloBtn") as HTMLButtonElement;
const p = document.getElementById("output") as HTMLParagraphElement;

button.addEventListener("click", (event: MouseEvent) => {
  p.textContent = `Hello from TypeSript`;
});
