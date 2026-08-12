const input = document.getElementById("undo-redo") as HTMLInputElement;
const undoButton = document.getElementById("undo-button") as HTMLButtonElement;
const redoButton = document.getElementById("redo-button") as HTMLButtonElement;

let back: string[] = []; // a back stack, holding earlier values of the input
let forward: string[] = []; // a forward stack, holding values that have been undone
let current: string = "";

// disable the Undo button when back is empty, and the Redo button when forward is empty
function updateButtonStates() {
  if (back.length === 0) {
    undoButton.disabled = true;
  } else {
    undoButton.disabled = false;
  }

  if (forward.length === 0) {
    redoButton.disabled = true;
  } else {
    redoButton.disabled = false;
  }
  console.log("back:", back, "| current:", current, "| forward:", forward);
}
updateButtonStates();

// on every change to the input, push the previous value onto back, update the current value to the new one, and empty forward
input.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
  back.push(current);
  current = newValue;
  forward = [];
  updateButtonStates();
});

// on Undo (when back is non-empty), push the current value onto forward, pop the top of back, and set it as the current value
undoButton.addEventListener("click", () => {
  if (back.length > 0) {
    forward.push(current);
    current = back.pop()!;
    input.value = current;
    updateButtonStates();
  }
});

// on Redo (when forward is non-empty), push the current value onto back, pop the top of forward, and set it as the current value
redoButton.addEventListener("click", () => {
  if (forward.length > 0) {
    back.push(current);
    current = forward.pop()!;
    input.value = current;
    updateButtonStates();
  }
});
