const select = document.getElementById("colorSelect") as HTMLSelectElement;
const div = document.getElementById("colorBox") as HTMLDivElement;

select.addEventListener("change", (event: Event) => {
  div.style.backgroundColor = select.value;
});
