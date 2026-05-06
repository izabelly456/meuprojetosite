AOS.init();

/* LOADER */
window.addEventListener("load", () => {
document.getElementById("loader").style.display = "none";
});

/* PARTICLES (MANTIDO IGUAL) */
particlesJS("particles-js", {
particles: {
number: { value: 80 },
color: { value: "#a855f7" },
shape: { type: "circle" },
opacity: { value: 0.5 },
size: { value: 3 },
line_linked: {
enable: true,
distance: 150,
color: "#a855f7",
opacity: 0.4,
width: 1
},
move: {
enable: true,
speed: 1.5
}
},
interactivity: {
events: {
onhover: {
enable: true,
mode: "repulse"
}
}
}
});

/* =========================
   ⭐ AVALIAÇÕES
========================= */

let nota = 0;
let slideIndex = 0;

/* ESTRELAS */
const estrelas = document.querySelectorAll(".stars i");

estrelas.forEach((star, index) => {
star.addEventListener("click", () => {
nota = index + 1;

estrelas.forEach((s, i) => {
s.classList.toggle("active", i < nota);
});
});
});

/* CONVERTER FOTO */
function toBase64(file) {
return new Promise(resolve => {
const reader = new FileReader();
reader.onload = () => resolve(reader.result);
reader.readAsDataURL(file);
});
}

/* ADICIONAR AVALIAÇÃO */
async function adicionarAvaliacao() {

let nome = document.getElementById("nome").value;
let msg = document.getElementById("mensagem").value;
let fotoInput = document.getElementById("foto");

if (!nome || !msg || nota === 0) {
alert("Preencha tudo corretamente");
return;
}

let foto = "";

if (fotoInput && fotoInput.files[0]) {
foto = await toBase64(fotoInput.files[0]);
}

let lista = JSON.parse(localStorage.getItem("avaliacoes")) || [];

lista.push({
nome,
msg,
nota,
foto
});

localStorage.setItem("avaliacoes", JSON.stringify(lista));

document.getElementById("nome").value = "";
document.getElementById("mensagem").value = "";
if (fotoInput) fotoInput.value = "";

nota = 0;
estrelas.forEach(s => s.classList.remove("active"));

mostrarAvaliacoes();
}

/* MOSTRAR AVALIAÇÕES */
function mostrarAvaliacoes() {

let lista = JSON.parse(localStorage.getItem("avaliacoes")) || [];
lista = lista.reverse();

let container = document.getElementById("lista-avaliacoes");
container.innerHTML = "";

lista.forEach(av => {

let stars = "⭐".repeat(av.nota);

/* FOTO OU INICIAL */
let fotoHTML = "";

if (av.foto && av.foto !== "") {
fotoHTML = `<img class="avatar" src="${av.foto}">`;
} else {
let inicial = av.nome ? av.nome.charAt(0).toUpperCase() : "?";
fotoHTML = `<div class="avatar auto">${inicial}</div>`;
}

container.innerHTML += `
<div class="avaliacao glass">
${fotoHTML}
<h4>${av.nome}</h4>
<div>${stars}</div>
<p>${av.msg}</p>
</div>
`;
});

aplicarSlide();
}

/* CARROSSEL */
function aplicarSlide() {
let slides = document.getElementById("lista-avaliacoes");
slides.style.transform = `translateX(${-slideIndex * 270}px)`;
slides.style.transition = "0.5s";
}

function mudarSlide(dir) {

let lista = JSON.parse(localStorage.getItem("avaliacoes")) || [];
let max = Math.max(0, lista.length - 3);

slideIndex += dir;

if (slideIndex < 0) slideIndex = 0;
if (slideIndex > max) slideIndex = max;

aplicarSlide();
}

/* BOTÃO TOPO */
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
if (window.scrollY > 300) {
topBtn.style.display = "block";
} else {
topBtn.style.display = "none";
}
});

topBtn.addEventListener("click", () => {
window.scrollTo({
top: 0,
behavior: "smooth"
});
});

/* INICIAL */
mostrarAvaliacoes();