// tabelaEstacionamento.js

import { formatarData } from "./formatarData.js";
import { formatarValor } from "./formatarValor.js";

export function adicionarNaTabela(veiculo, tabela, tipo) {
    const row = tabela.insertRow();

    if (tipo === "estacionamento") {
        row.insertCell(0).innerText = veiculo.placa;
        row.insertCell(1).innerText = veiculo.veiculo;
        row.insertCell(2).innerText = formatarData(veiculo.entrada); // Formata a data de entrada
    } else if (tipo === "relatorio") {
        row.insertCell(0).innerText = veiculo.placa;
        row.insertCell(1).innerText = veiculo.veiculo;
        row.insertCell(2).innerText = formatarData(veiculo.entrada); // Formata a data de entrada
        row.insertCell(3).innerText = formatarData(veiculo.saida);   // Formata a data de saída
        row.insertCell(4).innerText = formatarValor(veiculo.valorPago); // Formata o valor pago
    }
}
