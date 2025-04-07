const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

const tempoObjetivo1 = new Date("2025-05-30T00:00:00");
const tempoObjetivo2 = new Date("2025-04-28T00:00:00");
const tempoObjetivo3 = new Date("2025-09-02T00:00:00");
const tempoObjetivo4 = new Date("2025-12-01T00:00:00");

const tempos = [tempoObjetivo1, tempoObjetivo2, tempoObjetivo3, tempoObjetivo4];

// Troca de abas com animação
botoes.forEach((botao, i) => {
  botao.addEventListener("click", () => {
    botoes.forEach(b => b.classList.remove("ativo"));
    textos.forEach(t => t.classList.remove("ativo"));

    botao.classList.add("ativo");
    textos[i].classList.add("ativo");
  });
});

// Calcula o tempo restante
function calculaTempo(tempoObjetivo) {
  const tempoAtual = new Date();
  const tempoFinal = tempoObjetivo - tempoAtual;

  let segundos = Math.floor(tempoFinal / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);
  let dias = Math.floor(horas / 24);

  segundos %= 60;
  minutos %= 60;
  horas %= 24;

  return tempoFinal > 0 ? [dias, horas, minutos, segundos] : [0, 0, 0, 0];
}

// Atualiza cronômetros com efeito
function atualizaCronometro() {
  tempos.forEach((tempo, i) => {
    const [dias, horas, minutos, segundos] = calculaTempo(tempo);

    atualizaElemento(`dias${i}`, dias);
    atualizaElemento(`horas${i}`, horas);
    atualizaElemento(`min${i}`, minutos);
    atualizaElemento(`seg${i}`, segundos);
  });
}

// Aplica animação ao número que muda
function atualizaElemento(id, novoValor) {
  const el = document.getElementById(id);
  if (el.textContent != novoValor) {
    el.classList.add("atualizando");
    el.textContent = novoValor;
    setTimeout(() => el.classList.remove("atualizando"), 300);
  }
}

function comecaCronometro() {
  atualizaCronometro();
  setInterval(atualizaCronometro, 1000);
}

comecaCronometro();
