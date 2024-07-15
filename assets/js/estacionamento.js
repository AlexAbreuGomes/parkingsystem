document.addEventListener("DOMContentLoaded", () => {
  const entradaForm = document.getElementById("entradaForm");
  const saidaForm = document.getElementById("saidaForm");
  const tabelaEstacionados = document.getElementById("tabelaEstacionados").getElementsByTagName("tbody")[0];


entradaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const placa = document.getElementById("placa").value;
  const veiculo = document.getElementById("veiculo").value;
  const entrada = new Date().toLocaleString();

  const novoVeiculo = { placa, veiculo, entrada };
  adicionarNaTabela(novoVeiculo);
  salvarNoLocalStorage(novoVeiculo);

  entradaForm.reset();
});

saidaForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const saidaPlaca = document.getElementById('saidaPlaca').value;
    registrarSaida(saidaPlaca);

    saidaForm.reset();
});


// let numVagas = 20;

// if (numVagas > 0) {
//     numVagas--;
//     document.getElementById("vaga").textContent = numVagas.toString();
//    }


   function adicionarNaTabela(veiculo) {
    const row = tabelaEstacionados.insertRow();
    row.insertCell(0).innerText = veiculo.placa;
    row.insertCell(1).innerText = veiculo.veiculo;
    row.insertCell(2).innerText = veiculo.entrada;
}

function salvarNoLocalStorage(veiculo) {
    let veiculos = JSON.parse(localStorage.getItem('veiculosEstacionados')) || [];
    veiculos.push(veiculo);
    localStorage.setItem('veiculosEstacionados', JSON.stringify(veiculos));
}

function registrarSaida(placa) {
    let veiculos = JSON.parse(localStorage.getItem('veiculosEstacionados')) || [];
    const veiculoIndex = veiculos.findIndex(item => item.placa === placa);

    if (veiculoIndex !== -1) {
        const veiculo = veiculos[veiculoIndex];
        veiculos.splice(veiculoIndex, 1);
        localStorage.setItem('veiculosEstacionados', JSON.stringify(veiculos));
        
        const saida = new Date().toLocaleString();
        const valorPago = calcularValorPago(new Date(veiculo.entrada), new Date(saida));
        const veiculoSaida = { ...veiculo, saida, valorPago };
        salvarNoRelatorio(veiculoSaida);
        removerDaTabela(placa);
    } else {
        alert('Veículo não encontrado');
    }
}

function calcularValorPago(entrada, saida) {
    const diffMs = saida - entrada;
    const diffHoras = Math.ceil(diffMs / (1000 * 60 * 60));
    return diffHoras * 5; // Exemplo: R$ 5 por hora
}

function salvarNoRelatorio(veiculo) {
    let relatorio = JSON.parse(localStorage.getItem('relatorioEstacionamento')) || [];
    relatorio.push(veiculo);
    localStorage.setItem('relatorioEstacionamento', JSON.stringify(relatorio));
}

function removerDaTabela(placa) {
    const rows = tabelaEstacionados.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].innerText === placa) {
            tabelaEstacionados.deleteRow(i);
            break;
        }
    }
}

function carregarDados() {
    const veiculos = JSON.parse(localStorage.getItem('veiculosEstacionados')) || [];
    veiculos.forEach(adicionarNaTabela);
}

carregarDados();

});

