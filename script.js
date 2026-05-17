// Toggle Dark / Light Mode
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggle.textContent = document.body.classList.contains("light-mode") ? "🌞" : "🌙";
});

// Charger les repos GitHub dynamiquement
fetch("https://api.github.com/users/Cuatro127/repos")
.then(res => res.json())
.then(data => {
    let container = document.getElementById("github-projects");
    container.innerHTML = "";
    data.forEach(repo => {
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "Pas de description"}</p>
            <a href="${repo.html_url}" target="_blank" class="project-btn">Voir</a>
        `;
        container.appendChild(div);
    });
});

// Animations au scroll
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("visible");
        }
    });
},{ threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Traduction FR / EN
const langBtn = document.getElementById("lang-toggle-btn");
let currentLang = "fr";

langBtn.addEventListener("click", () => {
    const texts = document.querySelectorAll("[data-en]");
    if(currentLang === "fr"){
        texts.forEach(el => el.innerText = el.getAttribute("data-en"));
        langBtn.innerText = "EN";
        currentLang = "en";
    } else {
        texts.forEach(el => el.innerText = el.getAttribute("data-fr") || el.innerText);
        langBtn.innerText = "FR";
        currentLang = "fr";
    }
});