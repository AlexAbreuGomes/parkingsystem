// estacionamento.js

import { validaPlacaBrasil } from "./validacaoPlaca.js";
import { formatarValor } from "./formatarValor.js";
import { exibirMensagem } from "./exibirMensagem.js";
import { carregarTarifasEVagas, atualizarExibicao } from "./configuracoes.js";
import { calcularValorEstacionamento } from "./calculosEstacionamento.js";
import { atualizarVagasDisponiveis, obterVeiculoPorPlaca } from "./gerenciamentoVagas.js";
import { calcularTempoPermanencia } from "./calcularTempoPermanencia.js";
import { gerarVeiculoSaida } from "./gerarVeiculoSaida.js";
import { mostrarNotificacao } from "./notificacao.js";
import { removerVeiculoTabela } from "./tabelaEstacionamento.js";
import {padronizarPlaca,veiculoJaRegistrado, salvarNoRelatorio,carregarDados} from "./amarmazenamentoLocal.js"
import { adicionarNaTabela } from "./adicionarVeiculo.js"; // Importação da função modularizada

document.addEventListener("DOMContentLoaded", () => {
    const vagasDisponiveisElement = document.getElementById("vagasDisponiveis");
    const entradaForm = document.getElementById("entradaForm");
    const saidaForm = document.getElementById("saidaForm");
    const tabelaEstacionados = document.getElementById("tabelaEstacionados").getElementsByTagName("tbody")[0];
    const valorPagarElement = document.getElementById("valorPagar");

    let { tarifaMinima, tarifaHora, tarifaDia, vagasAtual } = carregarTarifasEVagas();

    const tarifaMinimaElement = document.getElementById("tarifaMinimaAtual");
    const tarifaHoraElement = document.getElementById("tarifaHoraAtual");
    const tarifaDiaElement = document.getElementById("tarifaDiaAtual");

    if (tarifaMinimaElement && tarifaHoraElement && tarifaDiaElement) {
        atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia, vagasAtual });
    }

    function atualizarVagas() {
        return atualizarVagasDisponiveis(vagasAtual, vagasDisponiveisElement);
    }

    atualizarVagas();

    entradaForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const vagasDisponiveis = atualizarVagas();
        if (vagasDisponiveis <= 0) {
            mostrarNotificacao("Não há vagas disponíveis.");
            entradaForm.reset();
            return;
        }

        const placa = document.getElementById("placa").value;
        const veiculo = document.getElementById("veiculo").value;
        const entrada = new Date().toISOString();

        if (!validaPlacaBrasil(placa)) {
            mostrarNotificacao("Placa inválida. Por favor, insira uma placa no formato correto.");
            entradaForm.reset();
            return;
        }

        if (veiculoJaRegistrado(placa)) {
            mostrarNotificacao("Este veículo já está registrado no estacionamento.");
            entradaForm.reset();
            return;
        }

        const novoVeiculo = { placa: padronizarPlaca(placa), veiculo, entrada };
        adicionarNaTabela(novoVeiculo, tabelaEstacionados, "estacionamento"); // Chamada da função modularizada

        let veiculos = JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
        veiculos.push(novoVeiculo);
        localStorage.setItem("veiculosEstacionados", JSON.stringify(veiculos));

        atualizarVagas();
        entradaForm.reset();
    });

    saidaForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const saidaPlaca = document.getElementById("saidaPlaca").value;
        registrarSaida(saidaPlaca);
        atualizarVagas();
        saidaForm.reset();
    });

    function registrarSaida(placa) {
        const veiculo = obterVeiculoPorPlaca(placa);
        if (!veiculo) {
            mostrarNotificacao("Veículo não encontrado.");
            return;
        }

        const saida = new Date();
        const valorPago = calcularValorEstacionamento(
            new Date(veiculo.entrada),
            saida,
            tarifaMinima,
            tarifaHora,
            tarifaDia
        );
        const tempoPermanencia = calcularTempoPermanencia(veiculo.entrada, saida);
        const valorFormatado = formatarValor(valorPago);

        exibirMensagem(veiculo, valorFormatado, tempoPermanencia, valorPagarElement);

        const veiculoSaida = gerarVeiculoSaida(veiculo, saida, valorPago);
        salvarNoRelatorio(veiculoSaida);
        removerVeiculoTabela(placa, tabelaEstacionados); // Remover da tabela HTML
    }

    carregarDados((veiculo) => adicionarNaTabela(veiculo, tabelaEstacionados, "estacionamento"));
});
