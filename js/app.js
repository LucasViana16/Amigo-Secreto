let amigos = [];

function adicionar() {
    let amigo = document.getElementById("nome-amigo");

    // Verifica se o campo está vazio
    if (amigo.value.trim() === "") {
        alert("Informe o nome do amigo!");
        return;
    }

    // Converte o nome para maiúsculo antes de verificar e adicionar ao array
    let nomeAmigo = amigo.value.toUpperCase();

    // Verifica se o nome já foi adicionado (considerando maiúsculas/minúsculas)
    if (amigos.includes(nomeAmigo)) {
        alert("Nome já adicionado!");
        return;
    }

    // Elemento HTML para a lista de amigos
    let lista = document.getElementById("lista-amigos");

    // Adiciona o nome convertido para maiúsculo ao array
    amigos.push(nomeAmigo);

    // Atualiza a visualização da lista de amigos
    if (lista.textContent === "") {
        lista.textContent = nomeAmigo;
    } else {
        lista.textContent = lista.textContent + ", " + nomeAmigo;
    }

    // Limpa o campo de entrada
    amigo.value = "";

    // Atualiza a visualização da lista de amigos e o sorteio
    atualizarLista();
    atualizarSorteio();
}

// Função para sortear os amigos
function sortear() {
    if (amigos.length < 4) {
        alert("Adicione pelo menos 4 amigos!");
        return;
    }

    // Embaralha a lista de amigos
    embaralha(amigos);

    // Elemento HTML para o sorteio
    let sorteio = document.getElementById("lista-sorteio");

    // Limpa o conteúdo anterior do sorteio
    sorteio.innerHTML = "";

    // Exibe o sorteio na página
    for (let i = 0; i < amigos.length; i++) {
        let amigoAtual = amigos[i];
        let proximoAmigo = amigos[(i + 1) % amigos.length]; // Próximo amigo (loop circular)

        // Adiciona o sorteio na página
        sorteio.innerHTML += amigoAtual + " --> " + proximoAmigo + "<br>";
    }
}

// Função para excluir um amigo da lista
function excluirAmigo(index) {
    amigos.splice(index, 1); // Remove o amigo do array
    atualizarLista(); // Atualiza a lista de amigos na página
    atualizarSorteio(); // Atualiza o sorteio na página
}

// Função para embaralhar a lista de amigos
function embaralha(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

// Função para atualizar a visualização da lista de amigos na página
function atualizarLista() {
    let lista = document.getElementById("lista-amigos");
    lista.innerHTML = "";

    for (let i = 0; i < amigos.length; i++) {
        let paragrafo = document.createElement("p");
        paragrafo.textContent = amigos[i];

        // Adiciona evento de clique para excluir o amigo
        paragrafo.addEventListener("click", function () {
            excluirAmigo(i);
        });

        lista.appendChild(paragrafo); // Adiciona o parágrafo à lista na página
    }
}

// Função para reiniciar o sistema (limpa os arrays e a página)
function reiniciar() {
    amigos = []; // Limpa o array de amigos
    document.getElementById("lista-amigos").innerHTML = ""; // Limpa a lista de amigos na página
    document.getElementById("lista-sorteio").innerHTML = ""; // Limpa o sorteio na página
}
