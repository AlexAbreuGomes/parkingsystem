// estacionamento.js
import { atualizarDataHora } from "./dataHora.js";
import { validaPlacaBrasil } from "./validacaoPlaca.js";
import { carregarTarifasEVagas, atualizarExibicao ,salvarNoLocalStorage,} from "./configuracoes.js";

document.addEventListener("DOMContentLoaded", () => {
    const vagasDisponiveisElement = document.getElementById("vagasDisponiveis");
    const entradaForm = document.getElementById("entradaForm");
    const saidaForm = document.getElementById("saidaForm");
    const tabelaEstacionados = document.getElementById("tabelaEstacionados").getElementsByTagName("tbody")[0];
    const valorPagarElement = document.getElementById("valorPagar");

    // Carrega tarifas e vagas
    let { tarifaMinima, tarifaHora, tarifaDia, vagasAtual } = carregarTarifasEVagas();

    // Só chama atualizarExibicao se os elementos necessários existirem
    const tarifaMinimaElement = document.getElementById("tarifaMinimaAtual");
    const tarifaHoraElement = document.getElementById("tarifaHoraAtual");
    const tarifaDiaElement = document.getElementById("tarifaDiaAtual");

    if (tarifaMinimaElement && tarifaHoraElement && tarifaDiaElement) {
        atualizarExibicao({ tarifaMinima, tarifaHora, tarifaDia });
    }

    // Atualizar o número de vagas disponíveis
    function atualizarVagasDisponiveis() {
        const veiculos = JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
        const vagasDisponiveis = vagasAtual - veiculos.length;
        vagasDisponiveisElement.innerText = vagasDisponiveis;
    }

    // Inicializa a exibição das vagas disponíveis
    atualizarVagasDisponiveis();

    entradaForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const placa = document.getElementById("placa").value;
        const veiculo = document.getElementById("veiculo").value;
        const entrada = new Date().toISOString();

        if (!validaPlacaBrasil(placa)) {
            alert("Placa inválida. Por favor, insira uma placa no formato correto.");
            return;
        }

        const novoVeiculo = { placa, veiculo, entrada };
        adicionarNaTabela(novoVeiculo);

        let veiculos = JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
        veiculos.push(novoVeiculo);
        localStorage.setItem("veiculosEstacionados", JSON.stringify(veiculos));

        atualizarVagasDisponiveis();
        entradaForm.reset();
    });

    saidaForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const saidaPlaca = document.getElementById("saidaPlaca").value;
        registrarSaida(saidaPlaca);
        atualizarVagasDisponiveis();
        saidaForm.reset();
    });

    // Calcula o valor do estacionamento
    function formatarData(data) {
        return new Date(data).toLocaleString('pt-BR', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }

    // Função principal para calcular o valor do estacionamento
    function calcularValorEstacionamento(entrada, saida, tarifaMinima, tarifaHora, tarifaDia) {
        const diffMs = new Date(saida) - new Date(entrada);
        const diffMinutos = diffMs / (1000 * 60);

        if (diffMinutos <= 15) {
            return tarifaMinima;
        }

        const diffHoras = Math.ceil(diffMinutos / 60);
        const diasCompletos = Math.floor(diffHoras / 24);
        const horasRestantes = diffHoras % 24;

        // Calcular valor total
        let valorTotal = calcularValorDias(diasCompletos, tarifaDia);
        valorTotal += calcularValorTempoRestante(diasCompletos, horasRestantes, tarifaMinima, tarifaHora);

        return valorTotal;
    }

    // Função auxiliar para calcular valor dos dias completos
    function calcularValorDias(diasCompletos, tarifaDia) {
        return diasCompletos * tarifaDia;
    }

    // Função auxiliar para calcular o valor do tempo restante (horas ou minutos restantes após dias completos)
    function calcularValorTempoRestante(diasCompletos, horasRestantes, tarifaMinima, tarifaHora) {
        if (diasCompletos > 0 && horasRestantes <= 15) {
            return tarifaMinima;
        } else if (horasRestantes > 0) {
            return horasRestantes * tarifaHora;
        }
        return 0;
    }



    function adicionarNaTabela(veiculo) {
        const row = tabelaEstacionados.insertRow();
        row.insertCell(0).innerText = veiculo.placa;
        row.insertCell(1).innerText = veiculo.veiculo;
        row.insertCell(2).innerText = new Date(veiculo.entrada).toLocaleString();
    }

    function formatarData(data) {
        return new Date(data).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }

    async function registrarSaida(placa) {
        let veiculos = JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
        const veiculoIndex = veiculos.findIndex((item) => item.placa === placa);

        if (veiculoIndex !== -1) {
            const veiculo = veiculos[veiculoIndex];
            veiculos.splice(veiculoIndex, 1);
            localStorage.setItem("veiculosEstacionados", JSON.stringify(veiculos));

            const saida = new Date();
            const valorPago = calcularValorEstacionamento(
                new Date(veiculo.entrada),
                saida,
                tarifaMinima,
                tarifaHora,
                tarifaDia
            );

            // Formatação do valor pago com separação de milhar e vírgula como separador decimal
            const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorPago);

            // Calcular o tempo de permanência
            const diffMs = saida - new Date(veiculo.entrada); // diferença em milissegundos
            const diffMinutos = diffMs / (1000 * 60);
            const diffHoras = Math.floor(diffMinutos / 60);
            const minutosRestantes = Math.floor(diffMinutos % 60);
            const diffDias = Math.floor(diffHoras / 24);
            const horasRestantes = diffHoras % 24;

            let tempoPermanencia = `${diffDias} dia(s), ${horasRestantes} hora(s) e ${minutosRestantes} minuto(s)`;

            // Exibir mensagem com valor formatado, tempo de permanência, placa e veículo
            valorPagarElement.innerText = `Placa: ${veiculo.placa}\nVeículo: ${veiculo.veiculo}\nValor total a pagar: ${valorFormatado}\nTempo de permanência: ${tempoPermanencia}`;

            // Remover a mensagem após 5 segundos (5000 milissegundos)
            setTimeout(() => {
                valorPagarElement.innerText = ''; // Apaga a mensagem
            }, 5000);

            // Formatar as datas antes de adicionar ao relatório
            const entradaFormatada = formatarData(veiculo.entrada);
            const saidaFormatada = formatarData(saida);

            const veiculoSaida = {
                placa: veiculo.placa,
                veiculo: veiculo.veiculo,
                entrada: entradaFormatada,
                saida: saidaFormatada,
                valorPago,
            };

            salvarNoRelatorio(veiculoSaida);
            removerDaTabela(placa);

            await enviarDadosParaBanco(veiculoSaida);
        } else {
            alert("Veículo não encontrado");
        }
    }




    function removerDaTabela(placa) {
        const rows = tabelaEstacionados.rows;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].innerText === placa) {
                tabelaEstacionados.deleteRow(i);
                break;
            }
        }
    }

    function salvarNoRelatorio(veiculo) {
        let relatorio = JSON.parse(localStorage.getItem("relatorioEstacionamento")) || [];
        relatorio.push(veiculo);
        localStorage.setItem("relatorioEstacionamento", JSON.stringify(relatorio));
    }

    function carregarDados() {
        const veiculos = JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
        veiculos.forEach(adicionarNaTabela);
        atualizarVagasDisponiveis();
    }

    carregarDados();

});
