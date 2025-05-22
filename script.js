// Seu script completo com carrinho persistente em localStorage e finalização no WhatsApp com limpeza do carrinho
// Seu script completo com carrinho persistente, WhatsApp, modal de confirmação estilizado e toast animado

function toggleMenu() {
  const menu = document.getElementById('side-menu');
  menu.classList.toggle('active');
}

function fecharBanner() {
  const banner = document.getElementById('bannerDesconto');
  if (banner) banner.style.display = 'none';
}

let carrinho = [];
let carrinhoAberto = false;

function abrirCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho-lateral");
  carrinhoDiv.classList.add("aberto");
  carrinhoAberto = true;
  atualizarCarrinho();
}

function fecharCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho-lateral");
  carrinhoDiv.classList.remove("aberto");
  carrinhoAberto = false;
}

function adicionarAoCarrinho(nome, preco, imagem) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, imagem, quantidade: 1 });
  }
  salvarCarrinhoNoLocalStorage();
  abrirCarrinho();
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  const item = carrinho[index];
  const idProduto = getIdDoProduto(item.nome);
  if (estoque[idProduto] !== undefined) {
    estoque[idProduto] += item.quantidade;
    salvarEstoqueNoLocalStorage();
    atualizarBotoesEstoque();
  }
  carrinho.splice(index, 1);
  salvarCarrinhoNoLocalStorage();
  atualizarCarrinho();
}

function salvarCarrinhoNoLocalStorage() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarCarrinho() {
  const container = document.querySelector(".carrinho-itens");
  const contador = document.querySelector(".cart-count");
  container.innerHTML = "";

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio</p>";
    contador.textContent = "0";
    atualizarLinkWhatsApp();
    return;
  }

  let total = 0;
  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-carrinho";
    itemDiv.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div>
        <h4>${item.nome}</h4>
        <p>R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
        <p><strong>Subtotal: R$ ${subtotal.toFixed(2)}</strong></p>
        <button onclick="removerDoCarrinho(${index})">Remover</button>
      </div>
    `;
    container.appendChild(itemDiv);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "total-carrinho";
  totalDiv.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
  container.appendChild(totalDiv);
  contador.textContent = carrinho.length;
  atualizarLinkWhatsApp();
}

function atualizarLinkWhatsApp() {
  const linkZap = document.querySelector(".botao-finalizar");
  if (!linkZap) return;

  if (carrinho.length === 0) {
    linkZap.href = "https://wa.me/5583999733374";
    linkZap.onclick = null;
    return;
  }

  let mensagem = "Olá! Gostaria de finalizar minha compra com os seguintes itens:%0A";
  let total = 0;
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - ${item.quantidade}x R$ ${item.preco.toFixed(2)}%0A`;
    total += item.preco * item.quantidade;
  });
  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
  const urlZap = `https://wa.me/5583999733374?text=${mensagem}`;

  linkZap.onclick = function (e) {
    e.preventDefault();
    abrirModalConfirmacao(urlZap);
  };
}

function abrirModalConfirmacao(urlZap) {
  const modal = document.getElementById("modal-confirmacao");
  modal.style.display = "flex";
  modal.dataset.url = urlZap;
  const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_beb5fe6bfa.mp3');
  audio.play();
}

function fecharModalConfirmacao() {
  document.getElementById("modal-confirmacao").style.display = "none";
}

function confirmarFinalizacao() {
  const modal = document.getElementById("modal-confirmacao");
  const urlZap = modal.dataset.url;
  window.location.href = urlZap;
  setTimeout(() => {
    carrinho = [];
    localStorage.removeItem("carrinho");
    atualizarCarrinho();
    mostrarMensagemCarrinho("Produto adicionado ao carrinho!");
    fecharModalConfirmacao();
  }, 1000);
}

function mostrarMensagemCarrinho(texto) {
  const msg = document.getElementById("mensagem-carrinho");
  msg.textContent = "✅ " + texto;
  msg.style.display = "block";
  msg.style.animation = "aparecer 0.3s ease forwards";
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}

function getIdDoProduto(nome) {
  return nome.toLowerCase().replace(/\s+/g, "-");
}

const carrinhoSalvo = localStorage.getItem("carrinho");
if (carrinhoSalvo) {
  carrinho = JSON.parse(carrinhoSalvo);
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarCarrinho();
});



// ====== ESTOQUE COM LOCALSTORAGE =======

let estoque = {
  "borboleta": 1,
  "colar-são-bento": 2,
  "pingente-cravejado-redondo": 2,
  "pingente-sao-bento": 2,
  "brinco-cravejado-rosa-quadrado": 1,
  "brinco-asa-de-borboleta": 1,
  "brinco-luxo-gota-azul": 1,
  "brinco-hamsa": 1,
  "brinco-cravejado-olho-grego": 1,
  "trio-borboleta": 1,
  "pulseira-aurora": 1,
  "pulseira-olho-grego": 1,
  "pulseira-solzinhoe": 3,
  "pingente-borboleta": 2,
  "pulseira-flor": 1,
  "pulseira-pandora-coroa": 1,
  "anel-hamsa-pequeno-regulável": 3,
  "anel-margarida": 1,
  "anel-elefante-geométrico": 1,
  "anel-borboleta-cravejado": 2,
  "anel-rabo-de-sereia-regulável": 1,
  "anel-coroa-regulável": 2,
  "anel-lua-vazada": 1,
  "anel-hamsa-grande": 1,
  "pulseira-trevo-azul": 1,
  "pulseira-bismark": 1,
  "pingente-do-sol-do-amor": 1,
  "pingente-feita-de-sol": 1,
  "pingente-de-sol-de-sal-eu-sou": 1,
  "pingente-rabo-de-sereia": 2,
  "pingente-onda-e-sol": 1,
  "v12": 3,
  "v15": 3,
  "corrente-pipoca": 3,
  "singapura": 3,
  "tornozeleira-delicada": 3,
};

function carregarEstoqueDoLocalStorage() {
  const salvo = localStorage.getItem("estoque");
  if (salvo) {
    estoque = JSON.parse(salvo);
  }
}

function salvarEstoqueNoLocalStorage() {
  localStorage.setItem("estoque", JSON.stringify(estoque));
}

function atualizarBotoesEstoque() {
  for (let id in estoque) {
    const estoqueEl = document.getElementById("estoque-" + id);
    const botao = document.getElementById("btn-" + id);

    if (estoqueEl) estoqueEl.innerText = "Estoque: " + estoque[id];

    if (botao) {
      if (estoque[id] <= 0) {
        botao.disabled = true;
        botao.innerText = "ESGOTADO";
        botao.style.backgroundColor = "#ccc";
        botao.style.cursor = "not-allowed";
      } else {
        botao.disabled = false;
        botao.innerText = "Adicionar ao Carrinho";
        botao.style.backgroundColor = "";
        botao.style.cursor = "pointer";
      }
    }
  }
}

function adicionarAoCarrinhoComEstoque(nome, preco, imagem, idProduto) {
  if (estoque[idProduto] > 0) {
    estoque[idProduto]--;
    salvarEstoqueNoLocalStorage();
    atualizarBotoesEstoque();
    mostrarMensagemCarrinho("Produto adicionado ao carrinho!");
    adicionarAoCarrinho(nome, preco, imagem);
  } else {
    mostrarMensagemCarrinho("Produto esgotado!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  carregarEstoqueDoLocalStorage();
  atualizarBotoesEstoque();

  const inputBusca = document.querySelector(".search-bar input");
  const cards = document.querySelectorAll(".produto-card");

  inputBusca.addEventListener("input", function () {
    const termo = inputBusca.value.toLowerCase();
    cards.forEach(card => {
      const nome = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = nome.includes(termo) ? "block" : "none";
    });
  });

  const botaoSobre = document.querySelector('nav a[href="#sobre"]');
  const rodape = document.querySelector("footer");
  if (botaoSobre && rodape) {
    botaoSobre.addEventListener("click", function (e) {
      e.preventDefault();
      rodape.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// ========== MODAIS DE PRODUTO COM IMAGENS SWIPE ==========
let imagensAtuais = [];
let slideIndex = 0;
let startX = 0;

function abrirModal(imagem, titulo, descricao, preco) {
  const slider = document.getElementById("slider-imagens");
  slider.innerHTML = `<img src="${imagem}" class="ativo" />`;
  document.getElementById("modal-titulo").textContent = titulo;
  document.getElementById("modal-descricao").textContent = descricao;
  document.getElementById("modal-preco").textContent = preco;
  document.getElementById("modal-produto").style.display = "flex";
}

function abrirModalComImagens(imagens, titulo, descricao, preco) {
  const modal = document.getElementById("modal-produto");
  const slider = document.getElementById("slider-imagens");
  const indicadores = document.getElementById("slider-indicadores");

  imagensAtuais = imagens;
  slideIndex = 0;

  slider.innerHTML = imagens.map(img => `<img src="${img}">`).join('');
  indicadores.innerHTML = imagens.map((_, i) => `<span class="${i === 0 ? 'ativo' : ''}"></span>`).join('');
  document.getElementById("modal-titulo").textContent = titulo;
  document.getElementById("modal-descricao").textContent = descricao;
  document.getElementById("modal-preco").textContent = preco;

  const sliderArea = document.getElementById("slider-imagens");
  sliderArea.addEventListener("mousedown", onMouseStart);
  sliderArea.addEventListener("mouseup", onMouseEnd);
  sliderArea.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  sliderArea.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) mudarSlide(1);
    else if (endX - startX > 50) mudarSlide(-1);
  });

  atualizarSlide();
  modal.style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal-produto").style.display = "none";
}

function mudarSlide(direcao) {
  slideIndex = (slideIndex + direcao + imagensAtuais.length) % imagensAtuais.length;
  atualizarSlide();
}

function atualizarSlide() {
  const slider = document.getElementById("slider-imagens");
  const indicadores = document.querySelectorAll(".indicadores span");
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
  indicadores.forEach((el, i) => el.classList.toggle('ativo', i === slideIndex));
}

function onMouseStart(e) {
  startX = e.clientX;
}
function onMouseEnd(e) {
  const endX = e.clientX;
  if (startX - endX > 50) mudarSlide(1);
  else if (endX - startX > 50) mudarSlide(-1);
}




function reporEstoqueProduto() {
  const id = document.getElementById("idProduto").value.trim().toLowerCase();
  const qtd = parseInt(document.getElementById("novaQuantidade").value);

  if (!id || isNaN(qtd) || qtd < 0) {
    alert("Preencha corretamente o ID e a quantidade.");
    return;
  }

  let estoqueSalvo = JSON.parse(localStorage.getItem("estoque")) || {};
  estoqueSalvo[id] = qtd;
  localStorage.setItem("estoque", JSON.stringify(estoqueSalvo));
  alert(`Estoque do produto "${id}" foi atualizado para ${qtd} unidades.`);
  location.reload();
}


document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.key === "e") { // Ctrl + E ativa ou desativa o painel
    const painel = document.getElementById("painel-admin");
    painel.style.display = painel.style.display === "none" ? "block" : "none";
  }
});

// Começa invisível
document.getElementById("painel-admin").style.display = "none";
















