AOS.init();

/* LOADER */

window.addEventListener("load", () => {
document.getElementById("loader").style.display = "none";
});

/* PARTICLES */

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

/* FIREBASE */

const firebaseConfig = {

apiKey: "SUA_API_KEY",
authDomain: "SEU_PROJETO.firebaseapp.com",
projectId: "SEU_PROJETO",
storageBucket: "SEU_PROJETO.appspot.com",
messagingSenderId: "000000000",
appId: "APP_ID"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

/* ESTRELAS */

let nota = 0;

const estrelas = document.querySelectorAll(".stars i");

estrelas.forEach((star, index) => {

star.addEventListener("click", () => {

nota = index + 1;

estrelas.forEach((s, i) => {
s.classList.toggle("active", i < nota);
});

});

});

/* FOTO BASE64 */

function toBase64(file) {

return new Promise(resolve => {

const reader = new FileReader();

reader.onload = () => resolve(reader.result);

reader.readAsDataURL(file);

});

}

/* ADICIONAR AVALIAÇÃO */

async function adicionarAvaliacao() {

let nome = document.getElementById("nome").value.trim();

let msg = document.getElementById("mensagem").value.trim();

let fotoInput = document.getElementById("foto");

if (!nome || !msg || nota === 0) {

alert("Preencha tudo corretamente!");
return;

}

let foto = "";

if (fotoInput.files[0]) {
foto = await toBase64(fotoInput.files[0]);
}

await db.collection("avaliacoes").add({

nome,
msg,
nota,
foto,
data: Date.now()

});

document.getElementById("nome").value = "";
document.getElementById("mensagem").value = "";
document.getElementById("foto").value = "";

nota = 0;

estrelas.forEach(s => {
s.classList.remove("active");
});

}

/* MOSTRAR AVALIAÇÕES */

db.collection("avaliacoes")
.orderBy("data", "desc")
.onSnapshot(snapshot => {

let container = document.getElementById("lista-avaliacoes");

container.innerHTML = "";

snapshot.forEach(doc => {

let av = doc.data();

let stars = "⭐".repeat(av.nota);

let fotoHTML = "";

if (av.foto && av.foto !== "") {

fotoHTML = `
<img class="avatar" src="${av.foto}">
`;

} else {

let inicial = av.nome.charAt(0).toUpperCase();

fotoHTML = `
<div class="avatar auto">${inicial}</div>
`;

}

container.innerHTML += `

<div class="avaliacao glass">

${fotoHTML}

<h4>${av.nome}</h4>

<div class="estrelas-view">
${stars}
</div>

<p>${av.msg}</p>

</div>

`;

});

});

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