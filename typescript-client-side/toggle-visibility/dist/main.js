"use strict";
const button = document.getElementById("toggleBtn");
const p = document.getElementById("hiddenText");
button.addEventListener("click", (event) => {
    if (p.style.display === "none") {
        p.style.display = "block";
    }
    else {
        p.style.display = "none";
    }
});
//# sourceMappingURL=main.js.map