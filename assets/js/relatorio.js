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

    carregarRelatorio();
});
