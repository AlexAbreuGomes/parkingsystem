document.addEventListener('DOMContentLoaded', () => {
    const tabelaRelatorio = document.getElementById('tabelaRelatorio').getElementsByTagName('tbody')[0];

    function carregarRelatorio() {
        const relatorio = JSON.parse(localStorage.getItem('relatorioEstacionamento')) || [];
        relatorio.forEach(adicionarNaTabela);
    }

    function adicionarNaTabela(veiculo) {
        const row = tabelaRelatorio.insertRow();
        row.insertCell(0).innerText = veiculo.placa;
        row.insertCell(1).innerText = veiculo.veiculo;
        row.insertCell(2).innerText = veiculo.entrada;
        row.insertCell(3).innerText = veiculo.saida;
        row.insertCell(4).innerText = veiculo.valorPago;
    }

    function voltar() {
        window.location.href = 'registro.html';
    }

    function administrador() {
        window.location.href = 'admin.html';
    }

    function imprimir() {
        window.print();
    }

    function exportarParaCSV() {
        let csvContent = "data:text/csv;charset=utf-8,";
        const rows = document.querySelectorAll("table tr");
        
        rows.forEach(row => {
            const cols = row.querySelectorAll("td, th");
            const data = Array.from(cols).map(col => col.innerText).join(";");
            csvContent += data + "\r\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "teste.csv");
        document.body.appendChild(link);
        link.click();
    }

    document.getElementById('btnVoltar').addEventListener('click', voltar);
    document.getElementById('btnAdmin').addEventListener('click', administrador);
    document.getElementById('btnImprimir').addEventListener('click', imprimir);
    document.getElementById('btnExportarCSV').addEventListener('click', exportarParaCSV);
    document.getElementById('btnDeletar').addEventListener('click', () => {
        const placa = document.getElementById('inputPlaca').value;
        if (placa) {
            deletarVeiculo(placa);
        } else {
            alert('Por favor, digite a placa do veículo');
        }
    });

    carregarRelatorio();

    async function deletarVeiculo(placa) {
        try {
            const response = await fetch(`http://localhost:3000/removerVeiculo/${placa}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar veículo do banco de dados');
            }

            // Remover do localStorage
            let relatorio = JSON.parse(localStorage.getItem('relatorioEstacionamento')) || [];
            relatorio = relatorio.filter(veiculo => veiculo.placa !== placa);
            localStorage.setItem('relatorioEstacionamento', JSON.stringify(relatorio));

            // Remover da tabela
            const rows = tabelaRelatorio.rows;
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].cells[0].innerText === placa) {
                    tabelaRelatorio.deleteRow(i);
                    break;
                }
            }

            alert('Veículo deletado com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar veículo');
        }
    }
  
});