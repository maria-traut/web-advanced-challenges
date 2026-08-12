const button = document.getElementById("toggleBtn") as HTMLButtonElement;
const p = document.getElementById("hiddenText") as HTMLParagraphElement;

button.addEventListener("click", (event: MouseEvent) => {
  if (p.style.display === "none") {
    p.style.display = "block";
  } else {
    p.style.display = "none";
  }
});
