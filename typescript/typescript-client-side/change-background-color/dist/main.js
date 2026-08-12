"use strict";
const select = document.getElementById("colorSelect");
const div = document.getElementById("colorBox");
select.addEventListener("change", (event) => {
    div.style.backgroundColor = select.value;
});
//# sourceMappingURL=main.js.map