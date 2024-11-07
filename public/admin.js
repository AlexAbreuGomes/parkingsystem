import { mostrarNotificacao } from "./notificacao.js";

document.addEventListener("DOMContentLoaded", () => {
    const tarifaForm = document.getElementById("tarifaForm");
    const tarifaMinimaAtual = document.getElementById("tarifaMinimaAtual");
    const tarifaHoraAtual = document.getElementById("tarifaHoraAtual");
    const tarifaDiaAtual = document.getElementById("tarifaDiaAtual");
    const resetDataButton = document.getElementById("resetData");
    const vagasForm = document.getElementById("vagasForm");

    // Função para obter dados do localStorage
    const obterDoLocalStorage = (chave, valorPadrao) => {
        return parseFloat(localStorage.getItem(chave)) || valorPadrao;
    };

    // Função para salvar dados no localStorage
    const salvarNoLocalStorage = (chave, valor) => {
        localStorage.setItem(chave, valor);
    };

    // Função para validar entradas numéricas
    const validarNumero = (valor) => !isNaN(valor) && valor >= 0;

    // Função para atualizar a exibição das tarifas e vagas
    const atualizarExibicao = ({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual }) => {
        tarifaMinimaAtual.innerText = `R$: ${tarifaMinima},00`;
        tarifaHoraAtual.innerText = `R$: ${tarifaHora},00`;
        tarifaDiaAtual.innerText = `R$: ${tarifaDia},00`;
        document.getElementById("vagasAtual").innerText = vagasAtual;
    };

    // Função para carregar tarifas do localStorage
    const carregarTarifas = () => {
        return {
            tarifaMinima: obterDoLocalStorage("tarifaMinima", 3),
            tarifaHora: obterDoLocalStorage("tarifaHora", 6),
            tarifaDia: obterDoLocalStorage("tarifaDia", 100),
            vagasAtual: parseInt(localStorage.getItem("vagasAtual")) || 100
        };
    };

    // Carregar e exibir tarifas iniciais
    let { tarifaMinima, tarifaHora, tarifaDia, vagasAtual } = carregarTarifas();
    atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual });

    // Atualizar tarifas
    tarifaForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const novaTarifaMinima = parseFloat(document.getElementById("tarifaMinima").value);
        const novaTarifaHora = parseFloat(document.getElementById("tarifaHora").value);
        const novaTarifaDia = parseFloat(document.getElementById("tarifaDia").value);

        if (![novaTarifaMinima, novaTarifaHora, novaTarifaDia].every(validarNumero)) {
            mostrarNotificacao("Por favor, insira valores válidos para todas as tarifas.");
            return;
        }

        // Atualizar tarifas no localStorage
        salvarNoLocalStorage("tarifaMinima", novaTarifaMinima);
        salvarNoLocalStorage("tarifaHora", novaTarifaHora);
        salvarNoLocalStorage("tarifaDia", novaTarifaDia);

        tarifaMinima = novaTarifaMinima;
        tarifaHora = novaTarifaHora;
        tarifaDia = novaTarifaDia;

        // Atualizar exibição de tarifas
        atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual });
        tarifaForm.reset();
        mostrarNotificacao("Tarifas atualizadas com sucesso!");
    });

    // Resetar dados
    resetDataButton.addEventListener("click", () => {
        // Resetar no localStorage
        localStorage.removeItem("tarifaMinima");
        localStorage.removeItem("tarifaHora");
        localStorage.removeItem("tarifaDia");
        localStorage.removeItem("vagasAtual");

        // Resetar valores locais
        tarifaMinima = 3;
        tarifaHora = 6;
        tarifaDia = 100;
        vagasAtual = 100;

        // Atualizar exibição de tarifas
        atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual });
        mostrarNotificacao("Dados resetados com sucesso.");
    });

    // Atualizar vagas
    vagasForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const totalVagas = parseInt(document.getElementById("totalVagas").value);
        if (!validarNumero(totalVagas)) {
            mostrarNotificacao("Por favor, insira um número válido para o total de vagas.");
            return;
        }

        // Atualizar quantidade de vagas no localStorage
        salvarNoLocalStorage("vagasAtual", totalVagas);
        vagasAtual = totalVagas;

        // Atualizar exibição de vagas
        atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual });
        vagasForm.reset();
        mostrarNotificacao("Quantidade de vagas salva com sucesso!");
    });
});
