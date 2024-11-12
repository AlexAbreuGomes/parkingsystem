
// tabelaEstacionamento.js

import { formatarData } from "./formatarData.js";
import { formatarValor } from "./formatarValor.js";

// Função genérica para adicionar uma linha na tabela
export function adicionarNaTabela(veiculo, tabela, tipo) {
    const row = tabela.insertRow();

    if (tipo === "estacionamento") {
        // Adiciona colunas para a tabela de estacionamento
        row.insertCell(0).innerText = veiculo.placa;
        row.insertCell(1).innerText = veiculo.veiculo;
        row.insertCell(2).innerText = formatarData(veiculo.entrada);
    } else if (tipo === "relatorio") {
        // Adiciona colunas para a tabela de relatório
        row.insertCell(0).innerText = veiculo.placa;
        row.insertCell(1).innerText = veiculo.veiculo;
        row.insertCell(2).innerText = formatarData(veiculo.entrada);
        row.insertCell(3).innerText = formatarData(veiculo.saida);
        row.insertCell(4).innerText = formatarValor(veiculo.valorPago);
    }
}
