// admin.js

import { mostrarNotificacao } from "./notificacao.js";
import { salvarNoLocalStorage, carregarTarifasEVagas, atualizarExibicao } from "./configuracoes.js";

document.addEventListener("DOMContentLoaded", () => {
    const tarifaForm = document.getElementById("tarifaForm");
    const resetDataButton = document.getElementById("resetData");
    const vagasForm = document.getElementById("vagasForm");

    // Carregar e exibir tarifas e vagas iniciais
    let { tarifaMinima, tarifaHora, tarifaDia, vagasAtual } = carregarTarifasEVagas();
    atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual });

    // Atualizar tarifas
    tarifaForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const novaTarifaMinima = parseFloat(document.getElementById("tarifaMinima").value);
        const novaTarifaHora = parseFloat(document.getElementById("tarifaHora").value);
        const novaTarifaDia = parseFloat(document.getElementById("tarifaDia").value);

        if ([novaTarifaMinima, novaTarifaHora, novaTarifaDia].some(isNaN)) {
            mostrarNotificacao("Por favor, insira valores válidos para todas as tarifas.");
            return;
        }

        salvarNoLocalStorage("tarifaMinima", novaTarifaMinima);
        salvarNoLocalStorage("tarifaHora", novaTarifaHora);
        salvarNoLocalStorage("tarifaDia", novaTarifaDia);

        tarifaMinima = novaTarifaMinima;
        tarifaHora = novaTarifaHora;
        tarifaDia = novaTarifaDia;

        atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual });
        tarifaForm.reset();
        mostrarNotificacao("Tarifas atualizadas com sucesso!");
    });

    // Resetar dados
    resetDataButton.addEventListener("click", () => {
        localStorage.removeItem("tarifaMinima");
        localStorage.removeItem("tarifaHora");
        localStorage.removeItem("tarifaDia");
        localStorage.removeItem("vagasAtual");

        tarifaMinima = 3;
        tarifaHora = 6;
        tarifaDia = 100;
        vagasAtual = 100;

        atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual });
        mostrarNotificacao("Dados resetados com sucesso.");
    });

    // Atualizar vagas
    vagasForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const totalVagas = parseInt(document.getElementById("totalVagas").value);
        if (isNaN(totalVagas) || totalVagas < 0) {
            mostrarNotificacao("Por favor, insira um número válido para o total de vagas.");
            return;
        }

        salvarNoLocalStorage("vagasAtual", totalVagas);
        vagasAtual = totalVagas;

        atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual });
        vagasForm.reset();
        mostrarNotificacao("Quantidade de vagas salva com sucesso!");
    });
});
