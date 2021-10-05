
let prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
let theme
if (prefersDarkScheme.matches)
    theme = document.body.classList.contains("light-theme") ? "light" : "dark";
else
    theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
localStorage.setItem("theme", theme);

function toggle() {
    var currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark")
        document.body.classList.toggle("light-theme");
    else if (currentTheme == "light")
        document.body.classList.toggle("dark-theme");
    // Toggle theme toggler visuals
    [...document.querySelectorAll(".togglerVisual")].forEach(element => {
        element.classList.toggle("invisible")
    })
}