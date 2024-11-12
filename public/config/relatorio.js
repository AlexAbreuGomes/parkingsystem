// relatorio.js
import { mostrarNotificacao } from "./notificacao.js";
import { calcularSoma } from "./calcularSomaRelatorio.js";
import { exportarParaCSV } from "./exportaCsvRelatorio.js";
import { voltar,administrador,imprimir } from "./navegacaoEntrePaginas.js";
import { carregarRelatorio } from "./carregarRelatorio.js";

document.addEventListener("DOMContentLoaded", () => {
    const tabelaRelatorio = document.getElementById("tabelaRelatorio").getElementsByTagName("tbody")[0];
    const totalValorElemento = document.getElementById("valorTotalDia");
    const inputPlaca = document.getElementById("inputPlaca");

    function salvarEResetar() {
        const confirmacao = window.confirm("Tem certeza que deseja salvar e resetar o relatório?");
        if (confirmacao) {
            const hoje = new Date();
            const dataHoje = `${hoje.getDate().toString().padStart(2, '0')}-${(hoje.getMonth() + 1).toString().padStart(2, '0')}-${hoje.getFullYear()}`;
            
            exportarParaCSV(dataHoje, tabelaRelatorio, totalValorElemento);

            localStorage.setItem("relatorioEstacionamento", JSON.stringify([]));
            tabelaRelatorio.innerHTML = "";
            totalValorElemento.innerText = "0,00";

            mostrarNotificacao("Relatório resetado e salvo com sucesso!");
        } else {
            mostrarNotificacao("Ação cancelada");
        }
    }

    function deletarVeiculo(placa) {
        let relatorio = JSON.parse(localStorage.getItem("relatorioEstacionamento")) || [];
        relatorio = relatorio.filter(veiculo => veiculo.placa !== placa);
        localStorage.setItem("relatorioEstacionamento", JSON.stringify(relatorio));

        const rows = tabelaRelatorio.rows;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].innerText === placa) {
                tabelaRelatorio.deleteRow(i);
                break;
            }
        }

        calcularSoma(relatorio, totalValorElemento);
        mostrarNotificacao("Veículo deletado com sucesso!");
    }


    document.getElementById("btnVoltar").addEventListener("click", voltar);
    document.getElementById("btnAdmin").addEventListener("click", administrador);
    document.getElementById("btnImprimir").addEventListener("click", imprimir);
    document.getElementById("btnExportarCSV").addEventListener("click", () => {
        const dataHoje = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
        exportarParaCSV(dataHoje, tabelaRelatorio, totalValorElemento);
    });
    document.getElementById("btnSalvar").addEventListener("click", salvarEResetar);
    
    document.getElementById("btnDeletar").addEventListener("click", () => {
        const placa = inputPlaca.value;
        if (placa) {
            deletarVeiculo(placa);
            inputPlaca.value = "";
        } else {
            mostrarNotificacao("Por favor, digite a placa do veículo");
        }
    });

    carregarRelatorio(tabelaRelatorio, totalValorElemento);
});
