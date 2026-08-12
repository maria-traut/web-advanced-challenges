const decreaseButton = document.getElementById(
  "decreaseBtn",
) as HTMLButtonElement;
const increaseButton = document.getElementById(
  "increaseBtn",
) as HTMLButtonElement;
const span = document.getElementById("counter") as HTMLSpanElement;

let counter = 0;

decreaseButton.addEventListener("click", (event: MouseEvent) => {
  counter--;
  span.textContent = counter.toString();
});

increaseButton.addEventListener("click", (event: MouseEvent) => {
  counter--;
  span.textContent = counter.toString();
});
