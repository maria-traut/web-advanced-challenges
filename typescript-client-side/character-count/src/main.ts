const textarea = document.getElementById("textInput") as HTMLTextAreaElement;
const p = document.getElementById("charCount") as HTMLParagraphElement;

let charCount = 0;

textarea.addEventListener("input", (event) => {
  textarea.value.length !== 1
    ? (p.textContent = `${textarea.value.length} characters`)
    : (p.textContent = `1 character`);
});
