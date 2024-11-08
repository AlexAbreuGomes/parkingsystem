// configuracoes.js

// Função para salvar dados no localStorage
export const salvarNoLocalStorage = (chave, valor) => {
    localStorage.setItem(chave, valor);
};

// Função para obter dados do localStorage com valor padrão
export const obterDoLocalStorage = (chave, valorPadrao) => {
    return parseFloat(localStorage.getItem(chave)) || valorPadrao;
};

// Função para carregar tarifas do localStorage com valores padrão
export const carregarTarifasEVagas = () => {
    return {
        tarifaMinima: obterDoLocalStorage("tarifaMinima", 3),
        tarifaHora: obterDoLocalStorage("tarifaHora", 6),
        tarifaDia: obterDoLocalStorage("tarifaDia", 100),
        vagasAtual: parseInt(localStorage.getItem("vagasAtual")) || 100
    };
};

// Função para atualizar exibição de tarifas e vagas
export const atualizarExibicao = ({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual }) => {
    document.getElementById("tarifaMinimaAtual").innerText = `R$: ${tarifaMinima},00`;
    document.getElementById("tarifaHoraAtual").innerText = `R$: ${tarifaHora},00`;
    document.getElementById("tarifaDiaAtual").innerText = `R$: ${tarifaDia},00`;
    document.getElementById("vagasAtual").innerText = vagasAtual;
};
