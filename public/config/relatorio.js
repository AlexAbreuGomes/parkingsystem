// relatorio.js

import { formatarValor } from "./formatarValor.js";
import { adicionarNaTabela } from "./adicionarVeiculo.js";
import { mostrarNotificacao } from "./notificacao.js";

document.addEventListener("DOMContentLoaded", () => {
    const tabelaRelatorio = document.getElementById("tabelaRelatorio").getElementsByTagName("tbody")[0];
    const totalValorElemento = document.getElementById("valorTotalDia");
    const inputPlaca = document.getElementById("inputPlaca");

    // Função para carregar e exibir o relatório
    function carregarRelatorio() {
        const relatorio = JSON.parse(localStorage.getItem("relatorioEstacionamento")) || [];
        relatorio.forEach((veiculo) => adicionarNaTabela(veiculo, tabelaRelatorio, "relatorio"));
        calcularSoma(relatorio); // Calcula a soma ao carregar os dados
    }

    // Função para calcular a soma dos valores pagos no dia
    function calcularSoma(relatorio) {
        let soma = 0;
        relatorio.forEach(veiculo => {
            const valor = parseFloat(veiculo.valorPago) || 0;
            soma += valor;
        });
        totalValorElemento.innerText = formatarValor(soma.toFixed(2));
    }

    // Função para exportar o relatório para CSV
    function exportarParaCSV(dataHoje) {
        let csvContent = "Placa;Veículo;Entrada;Saída;Valor Pago\r\n";
    
        // Adiciona cada linha da tabela ao conteúdo do CSV
        const rows = tabelaRelatorio.querySelectorAll("tr");
        rows.forEach(row => {
            const cols = row.querySelectorAll("td");
            const data = Array.from(cols).map(col => col.innerText.trim()).join(";");
            csvContent += data + "\r\n";
        });

        // Adiciona o valor total ao final do CSV
        const valorTotal = totalValorElemento.innerText.trim();
        csvContent += `Total do Dia:;${valorTotal}\r\n`;

        // Cria e baixa o arquivo CSV
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `relatorio_${dataHoje}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    // Função para salvar e resetar o relatório
    function salvarEResetar() {
        const confirmacao = window.confirm("Tem certeza que deseja salvar e resetar o relatório?");
        if (confirmacao) {
            const hoje = new Date();
            const dataHoje = `${hoje.getDate().toString().padStart(2, '0')}-${(hoje.getMonth() + 1).toString().padStart(2, '0')}-${hoje.getFullYear()}`;
            
            exportarParaCSV(dataHoje);

            // Limpa o relatório do localStorage e da tabela
            localStorage.setItem("relatorioEstacionamento", JSON.stringify([]));
            tabelaRelatorio.innerHTML = ""; // Limpa a tabela de exibição
            totalValorElemento.innerText = "0,00"; // Reseta o valor total

            mostrarNotificacao("Relatório resetado e salvo com sucesso!");
        } else {
           mostrarNotificacao("Ação cancelada");
        }
    }

    // Função para deletar um veículo do relatório
    function deletarVeiculo(placa) {
        let relatorio = JSON.parse(localStorage.getItem("relatorioEstacionamento")) || [];
        relatorio = relatorio.filter(veiculo => veiculo.placa !== placa);
        localStorage.setItem("relatorioEstacionamento", JSON.stringify(relatorio));

        // Remove da tabela
        const rows = tabelaRelatorio.rows;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].innerText === placa) {
                tabelaRelatorio.deleteRow(i);
                break;
            }
        }

        // Recalcula a soma após a remoção
        calcularSoma(relatorio);
        mostrarNotificacao("Veículo deletado com sucesso!");
    }

    // Funções de navegação
    function voltar() {
        window.location.href = "registro.html";
    }

    function administrador() {
        window.location.href = "admin.html";
    }

    function imprimir() {
        window.print();
    }

    // Eventos dos botões
    document.getElementById("btnVoltar").addEventListener("click", voltar);
    document.getElementById("btnAdmin").addEventListener("click", administrador);
    document.getElementById("btnImprimir").addEventListener("click", imprimir);
    document.getElementById("btnExportarCSV").addEventListener("click", () => {
        const dataHoje = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
        exportarParaCSV(dataHoje);
    });
    document.getElementById("btnSalvar").addEventListener("click", salvarEResetar);
    
    // Evento do botão Deletar, com reset no campo de entrada
    document.getElementById("btnDeletar").addEventListener("click", () => {
        const placa = inputPlaca.value;
        if (placa) {
            deletarVeiculo(placa);
            inputPlaca.reset(); // Reset do campo de entrada
            console.log("Campo de entrada de placa resetado"); // Log para verificar
        } else {
            mostrarNotificacao("Por favor, digite a placa do veículo");
        }
    });

    // Carrega o relatório ao abrir a página
    carregarRelatorio();
});
