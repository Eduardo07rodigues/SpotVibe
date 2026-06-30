const playlist = [
  {
    nome: "Please Don't Go",
    artista: "Franky Perez",
    arquivo: "../musics/happy/BabyPleaseDon'tGo.mp3",
    capa: "../img/jointhemurder.jpg",
  },
  {
    nome: "Girl From North",
    artista: "The Lions",
    arquivo: "../musics/happy/GirlfromtheNorthCountry.mp3",
    capa: "../img/girlfromnorthcountry.jpg",
  },
  {
    nome: "Set My Body Free",
    artista: "The White Buffalo",
    arquivo: "../musics/happy/theWhiteBuffalo.mp3",
    capa: "../img/setmybodyfree.jpg",
  },
];

const audio = document.querySelector(".meuAudio");
const current = document.querySelector("#current");
const duration = document.querySelector("#duration");
const btnTocar = document.querySelector(".play");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const progress = document.querySelector("#progress");
const volumeSlider = document.getElementById("sound");
const volumeIcon = document.querySelector(".soundIcon");

function atualizarBarraVolume() {
  volumeSlider.style.backgroundSize = `${volumeSlider.value}% 100%`;
}
atualizarBarraVolume();

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;

  atualizarBarraVolume();

  if (volumeSlider.value == 0) {
    volumeIcon.classList.add("mutado");
    volumeIcon.src = "../img/nosound.png";
  } else {
    volumeIcon.classList.remove("mutado");
    volumeIcon.src = "../img/sound.png";
  }
});

volumeIcon.addEventListener("click", () => {
  volumeIcon.classList.toggle("mutado");

  if (volumeIcon.classList.contains("mutado")) {
    volumeIcon.src = "../img/nosound.png";
    volumeSlider.value = 0;
    audio.volume = 0;
  } else {
    volumeIcon.src = "../img/sound.png";
    volumeSlider.value = 100;
    audio.volume = 1;
  }
  atualizarBarraVolume();
});

const titulo = document.querySelector(".titulo");
const artista = document.querySelector(".artista");
const img = document.querySelector(".capa");

let musicaAtual = 0;

function carregarMusica() {
  titulo.textContent = playlist[musicaAtual].nome;
  artista.textContent = playlist[musicaAtual].artista;
  img.src = playlist[musicaAtual].capa;
  audio.src = playlist[musicaAtual].arquivo;
}
carregarMusica();

function atualizarBarraProgresso() {
  const porcentagem = (progress.value / progress.max) * 100;

  progress.style.backgroundSize = `${porcentagem}% 100%`;
}

btnNext.addEventListener("click", () => {
  const estavaTocando = !audio.paused;
  musicaAtual++;
  if (musicaAtual >= playlist.length) {
    musicaAtual = 0;
  }
  carregarMusica();

  if (estavaTocando) {
    audio.play();
  }
});

btnPrev.addEventListener("click", () => {
  const estavaTocando = !audio.paused;
  musicaAtual--;
  if (musicaAtual < 0) {
    musicaAtual = playlist.length - 1;
  }
  carregarMusica();

  if (estavaTocando) {
    audio.play();
  }
});

audio.addEventListener("ended", () => {
  btnNext.click();
  audio.play();
});

// Play e Pause
btnTocar.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btnTocar.classList.add("ativo");
    img.classList.add("ativo");
  } else {
    audio.pause();
    btnTocar.classList.remove("ativo");
    img.classList.remove("ativo");
  }
});

function formatarTempo(segundos) {
  if (isNaN(segundos)) return "00:00";

  const minutos = Math.floor(segundos / 60);
  const secs = Math.floor(segundos % 60);

  return `${minutos < 10 ? "0" : ""}${minutos}:${secs < 10 ? "0" : ""}${secs}`;
}

audio.addEventListener("loadedmetadata", () => {
  progress.max = audio.duration;
  atualizarBarraProgresso();
});
audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
  atualizarBarraProgresso();
});
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
  atualizarBarraProgresso();
});

// Atualiza o tempo atual conforme a música toca
audio.addEventListener("timeupdate", () => {
  current.textContent = formatarTempo(audio.currentTime);
});

// Aguarda o carregamento dos metadados (duração) do áudio
audio.addEventListener("loadedmetadata", () => {
  // Pega o valor total em segundos
  const totalSegundos = audio.duration;

  // Converte para um formato legível (Minutos:Segundos)
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = Math.floor(totalSegundos % 60);

  // Formata com zero à esquerda, se necessário
  const formatoMinutos = String(minutos).padStart(2, "0");
  const formatoSegundos = String(segundos).padStart(2, "0");

  // Exibe o valor total
  duration.textContent = `${formatoMinutos}:${formatoSegundos}`;
});
