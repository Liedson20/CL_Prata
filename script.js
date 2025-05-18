function toggleMenu() {
  const menu = document.getElementById('side-menu');
  menu.classList.toggle('active');
}
function fecharBanner() {
  const banner = document.getElementById('bannerDesconto');
  if (banner) {
    banner.style.display = 'none';
  }
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

  abrirCarrinho();
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
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
  if (carrinho.length === 0) {
    linkZap.href = "https://wa.me/5583999733374";
    return;
  }

  let mensagem = "Olá! Gostaria de finalizar minha compra com os seguintes itens:%0A";
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - ${item.quantidade}x R$ ${item.preco.toFixed(2)}%0A`;
    total += item.preco * item.quantidade;
  });

  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
  const url = `https://wa.me/5583999733374?text=${mensagem}`;
  linkZap.href = url;
}


document.addEventListener("DOMContentLoaded", function () {
  const botaoSobre = document.querySelector('nav a[href="#sobre"]');
  const rodape = document.querySelector("footer");

  if (botaoSobre && rodape) {
    botaoSobre.addEventListener("click", function (e) {
      e.preventDefault();
      rodape.scrollIntoView({ behavior: "smooth" });
    });
  }
});




document.addEventListener("DOMContentLoaded", function () {
  const inputBusca = document.querySelector(".search-bar input");
  const cards = document.querySelectorAll(".produto-card");

  inputBusca.addEventListener("input", function () {
    const termo = inputBusca.value.toLowerCase();

    cards.forEach((card) => {
      const nomeProduto = card.querySelector("h3").textContent.toLowerCase();
      if (nomeProduto.includes(termo)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});


// Adiciona nome do produto em maiúsculo ao carrinho
const nomeProdutoUpper = nome.toUpperCase(); // transforma o nome em maiúsculo

const nomeElem = document.createElement("h4");
nomeElem.textContent = nomeProdutoUpper;
div.appendChild(nomeElem);

