import { mostrarNotificacao } from "./notificacao.js";
import { calcularSoma } from "./calcularSomaRelatorio.js";
import { voltar, administrador, imprimir } from "./navegacaoEntrePaginas.js";
import { carregarRelatorio } from "./carregarRelatorio.js";
import { solicitarSenha } from "./solicitarSenha.js";
import { enviarRelatorioAoServidor } from "./enviarRelatorioServidor.js"; // Certifique-se de que está importando a função corretamente


document.addEventListener("DOMContentLoaded", () => {
    const tabelaRelatorio = document.getElementById("tabelaRelatorio").getElementsByTagName("tbody")[0];
    const totalValorElemento = document.getElementById("valorTotalDia");
    const inputPlaca = document.getElementById("inputPlaca");

    async function enviarRelatorio() {
        // Solicita a senha do usuário antes de realizar a ação
        const senhaValida = await solicitarSenha().catch(() => false);
        if (!senhaValida) {
            mostrarNotificacao("Senha incorreta ou ação cancelada.");
            return;
        }
    
        // Captura o relatório armazenado no localStorage
        const relatorio = JSON.parse(localStorage.getItem("relatorioEstacionamento")) || [];
    
        // Verifica se há dados no relatório
        if (relatorio.length > 0) {
            try {
                // Chama a função para enviar o relatório ao servidor
                await enviarRelatorioAoServidor(relatorio); // Envia o relatório ao servidor
    
                // Exibe uma mensagem de sucesso
                mostrarNotificacao("Relatório enviado com sucesso para o servidor!");
            } catch (erro) {
                mostrarNotificacao("Erro ao enviar o relatório ao servidor: " + erro.message);
            }
        } else {
            // Exibe um aviso caso não haja dados
            mostrarNotificacao("Não há dados para enviar.");
        }
    }
    

    async function resetarRelatorio() {
        const senhaValida = await solicitarSenha().catch(() => false);
        if (!senhaValida) {
            mostrarNotificacao("Senha incorreta ou ação cancelada.");
            return;
        }

        // Reseta os dados no localStorage
        localStorage.setItem("relatorioEstacionamento", JSON.stringify([]));

        // Limpa a tabela
        tabelaRelatorio.innerHTML = "";

        // Zera o total
        totalValorElemento.innerText = "0,00";

        // Notifica o usuário
        mostrarNotificacao("Relatório resetado com sucesso!");
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

    // Eventos dos botões
    document.getElementById("btnVoltar").addEventListener("click", voltar);
    document.getElementById("btnAdmin").addEventListener("click", administrador);
    document.getElementById("btnImprimir").addEventListener("click", imprimir);

    document.getElementById("btnSalvar").addEventListener("click", () => {
        // Chama a função para enviar o relatório ao servidor
        enviarRelatorio(); // Não há necessidade de passar parâmetros
    });

    document.getElementById("btnReset").addEventListener("click", () => {
        resetarRelatorio(); // Também não há parâmetros a serem passados aqui
    });

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
