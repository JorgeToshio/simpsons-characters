// Seleciona o container onde os cards serão inseridos dinamicamente
const cardsContainer = document.getElementById("cards");

// Endpoint da API dos Simpsons (retorna até 1000 personagens)
const API_URL = "https://apisimpsons.fly.dev/api/personajes?limit=1000";

/**
 * Função principal que busca os personagens da API
 */
async function fetchCharacters() {
  try {
    // Faz a requisição HTTP para o endpoint
    const response = await fetch(API_URL);

    // Converte a resposta em formato JSON
    const data = await response.json();

    // A API retorna os personagens dentro da chave "docs"
    const personagens = data.docs;

    // Chama a função que renderiza os cards na tela
    renderCards(personagens);
  } catch (error) {
    // Caso ocorra erro na requisição, mostra no console
    console.error("Erro ao carregar personagens:", error);

    // Exibe mensagem de erro para o usuário
    cardsContainer.innerHTML = "<p>Erro ao carregar dados da API.</p>";
  }
}

/**
 * Função que cria e insere os cards dinamicamente
 */
function renderCards(lista) {
  // Limpa o container antes de inserir novos cards
  cardsContainer.innerHTML = "";

  // Percorre cada personagem da lista retornada pela API
  lista.forEach(personaje => {
    // Cria o elemento principal do card
    const card = document.createElement("div");
    card.className = "card"; // Aplica a classe CSS "card"

    // Botão de favorito (coração no canto superior direito)
    const favorite = document.createElement("button");
    favorite.className = "favorite"; // Aplica estilo do coração
    favorite.setAttribute("aria-label", "Marcar como favorito"); // Acessibilidade
    // Alterna o estado visual ao clicar (ativo/inativo)
    favorite.addEventListener("click", () => {
      favorite.classList.toggle("active");
    });

    // Nome do personagem (acima da imagem)
    const name = document.createElement("h3");
    name.textContent = personaje.Nombre; // Pega o campo "Nombre" da API

    // Imagem do personagem
    const img = document.createElement("img");
    img.src = personaje.Imagen; // Pega o campo "Imagen" da API
    img.alt = `Imagem de ${personaje.Nombre}`; // Texto alternativo
    // Caso a imagem não carregue, aplica fallback
    img.addEventListener("error", () => {
      img.alt = "Imagem não disponível";
      img.style.background = "#eee"; // Fundo cinza para indicar erro
    });

    // Informações adicionais (ocupação e estado)
    const info = document.createElement("p");
    const estado = personaje.Estado ?? "Desconhecido";   // Campo "Estado"
    const ocupacao = personaje.Ocupacion ?? "Não informada"; // Campo "Ocupacion"
    info.textContent = `Ocupação: ${ocupacao} • Estado: ${estado}`;

    // Monta a estrutura do card na ordem correta:
    card.appendChild(favorite); // Ícone de favorito
    card.appendChild(name);     // Nome acima da imagem
    card.appendChild(img);      // Imagem central
    card.appendChild(info);     // Texto abaixo da imagem

    // Adiciona o card ao container principal
    cardsContainer.appendChild(card);
  });
}

// Executa a função ao carregar a página
fetchCharacters();