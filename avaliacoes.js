/* AOS */

AOS.init();

/* LOADER */

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

if(loader){
loader.style.display = "none";
}

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

}

});

/* FIREBASE */

const firebaseConfig = {

apiKey: "AIzaSyCj5H-DV3Z63VfHwoHg1BJvjdSBI74j3cw",

authDomain: "lunex-studio-2c832.firebaseapp.com",

projectId: "lunex-studio-2c832",

storageBucket: "lunex-studio-2c832.firebasestorage.app",

messagingSenderId: "405096037067",

appId: "1:405096037067:web:79dac2e62e13f0540a394e",

measurementId: "G-0ZQ6LP0B7W"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

/* MOSTRAR AVALIAÇÕES */

const lista = document.getElementById("lista-avaliacoes");

lista.innerHTML = `
<div class="sem-avaliacoes">
Carregando avaliações...
</div>
`;

db.collection("avaliacoes")
.orderBy("data", "desc")
.onSnapshot((snapshot) => {

if(snapshot.empty){

lista.innerHTML = `
<div class="sem-avaliacoes">
Nenhuma avaliação encontrada.
</div>
`;

return;

}

lista.innerHTML = "";

snapshot.forEach((doc) => {

const av = doc.data();

let estrelas = "";

for(let i = 0; i < av.nota; i++){

estrelas += `
<i class="fa-solid fa-star"></i>
`;

}

let fotoHTML = "";

if(av.foto && av.foto !== ""){

fotoHTML = `
<img src="${av.foto}" class="avatar">
`;

}else{

fotoHTML = `
<div class="avatar auto">
${av.nome.charAt(0).toUpperCase()}
</div>
`;

}

lista.innerHTML += `

<div class="avaliacao glass">

${fotoHTML}

<h4>${av.nome}</h4>

<div class="estrelas-view">
${estrelas}
</div>

<p>${av.msg}</p>

</div>

`;

});

}, (error) => {

console.log(error);

lista.innerHTML = `
<div class="sem-avaliacoes">
Erro ao carregar avaliações.
</div>
`;

});

/* BOTÃO TOPO */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

if(window.scrollY > 300){

topBtn.style.display = "block";

}else{

topBtn.style.display = "none";

}

});

topBtn.addEventListener("click", () => {

window.scrollTo({

top: 0,

behavior: "smooth"

});

});