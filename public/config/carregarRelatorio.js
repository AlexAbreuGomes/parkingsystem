import { calcularSoma } from "./calcularSomaRelatorio.js";
import { adicionarNaTabela } from "./adicionarVeiculo.js";

export function carregarRelatorio(tabelaRelatorio, totalValorElemento) {
    const relatorio = JSON.parse(localStorage.getItem("relatorioEstacionamento")) || [];
    relatorio.forEach((veiculo) => adicionarNaTabela(veiculo, tabelaRelatorio, "relatorio"));
    calcularSoma(relatorio, totalValorElemento);
}
