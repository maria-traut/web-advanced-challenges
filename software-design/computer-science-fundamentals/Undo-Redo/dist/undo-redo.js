const input = document.getElementById("undo-redo");
const undoButton = document.getElementById("undo-button");
const redoButton = document.getElementById("redo-button");
let back = []; // a back stack, holding earlier values of the input
let forward = []; // a forward stack, holding values that have been undone
let current = "";
function updateButtonStates() {
    if (back.length === 0) {
        undoButton.disabled = true;
    }
    else {
        undoButton.disabled = false;
    }
    if (forward.length === 0) {
        redoButton.disabled = true;
    }
    else {
        redoButton.disabled = false;
    }
    console.log("back:", back, "| current:", current, "| forward:", forward);
}
updateButtonStates();
input.addEventListener("input", (event) => {
    const input = event.target;
    const newValue = input.value;
    back.push(current);
    current = newValue;
    forward = [];
    updateButtonStates();
});
undoButton.addEventListener("click", () => {
    if (back.length > 0) {
        forward.push(current);
        current = back.pop();
        input.value = current;
        updateButtonStates();
    }
});
redoButton.addEventListener("click", () => {
    if (forward.length > 0) {
        back.push(current);
        current = forward.pop();
        input.value = current;
        updateButtonStates();
    }
});
export {};
//# sourceMappingURL=undo-redo.js.map