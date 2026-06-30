const playlist = [
  {
    nome: "Out Of My League",
    artista: "Fitz and The Tantrums",
    arquivo: "../musics/love/outofmyleague.mp3",
    capa: "../img/outofmyleague.jpg",
  },
  {
    nome: "I Wanna Be Yours",
    artista: "Arctic Monkeys",
    arquivo: "../musics/love/IWannaBeYours.mp3",
    capa: "../img/iwannabeyours.jpg",
  },
  {
    nome: "BabyDoll",
    artista: "Dominic Fike",
    arquivo: "../musics/love/Babydoll.mp3",
    capa: "../img/babydoll.avif",
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

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;

  if (volumeSlider.value == 0) {
    volumeIcon.classList.add("mutado");
    volumeIcon.src = "/img/nosound.png";
  } else {
    volumeIcon.classList.remove("mutado");
    volumeIcon.src = "/img/sound.png";
  }
});

volumeIcon.addEventListener("click", () => {
  volumeIcon.classList.toggle("mutado");

  if (volumeIcon.classList.contains("mutado")) {
    volumeIcon.src = "/img/nosound.png";
    volumeSlider.value = 0;
    audio.volume = 0;
  } else {
    volumeIcon.src = "/img/sound.png";
    volumeSlider.value = 100;
    audio.volume = 1;
  }
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
});
audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
});
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
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
