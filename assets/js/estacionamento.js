document.addEventListener("DOMContentLoaded", () => {
  const entradaForm = document.getElementById("entradaForm");
  const saidaForm = document.getElementById("saidaForm");
  const tabelaEstacionados = document
    .getElementById("tabelaEstacionados")
    .getElementsByTagName("tbody")[0];
  const valorPagarElement = document.getElementById("valorPagar");

  // Definir tarifas para o estacionamento
  const tarifaMinima = 3; // Valor para até 15 minutos
  const tarifaHora = 6;   // Valor por hora
  const tarifaDia = 100;  // Valor para 24 horas

  entradaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const placa = document.getElementById("placa").value;
    const veiculo = document.getElementById("veiculo").value;
    const entrada = new Date().toISOString();

    const novoVeiculo = { placa, veiculo, entrada };
    adicionarNaTabela(novoVeiculo);
    salvarNoLocalStorage(novoVeiculo);

    entradaForm.reset();
  });

  saidaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const saidaPlaca = document.getElementById("saidaPlaca").value;
    registrarSaida(saidaPlaca);

    saidaForm.reset();
  });

  // Definição da função calcularValorEstacionamento
  function calcularValorEstacionamento(entrada, saida, tarifaMinima, tarifaHora, tarifaDia) {
    if (!(entrada instanceof Date) || !(saida instanceof Date)) {
      throw new Error("Datas inválidas");
    }

    const diffMs = saida - entrada;
    const diffMinutos = diffMs / (1000 * 60);

    if (diffMinutos <= 15) {
      return tarifaMinima;
    }

    const diffHoras = Math.ceil(diffMinutos / 60);
    const diasCompletos = Math.floor(diffHoras / 24);
    const horasRestantes = diffHoras % 24;

    let valor = diasCompletos * tarifaDia;

    if (diasCompletos > 0 && horasRestantes <= 15) {
      valor += tarifaMinima;
    } else if (horasRestantes > 0) {
      valor += horasRestantes * tarifaHora;
    }

    return valor;
  }

  function adicionarNaTabela(veiculo) {
    const row = tabelaEstacionados.insertRow();
    row.insertCell(0).innerText = veiculo.placa;
    row.insertCell(1).innerText = veiculo.veiculo;
    row.insertCell(2).innerText = new Date(veiculo.entrada).toLocaleString();
  }

  function salvarNoLocalStorage(veiculo) {
    let veiculos =
      JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
    veiculos.push(veiculo);
    localStorage.setItem("veiculosEstacionados", JSON.stringify(veiculos));
  }

  function registrarSaida(placa) {
    let veiculos =
      JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
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
      valorPagarElement.innerText = `R$ ${valorPago.toFixed(2)}`;
      const veiculoSaida = {
        ...veiculo,
        saida: saida.toLocaleString(),
        valorPago,
      };
      salvarNoRelatorio(veiculoSaida);
      removerDaTabela(placa);
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
    let relatorio =
      JSON.parse(localStorage.getItem("relatorioEstacionamento")) || [];
    relatorio.push(veiculo);
    localStorage.setItem("relatorioEstacionamento", JSON.stringify(relatorio));
  }

  function carregarDados() {
    const veiculos =
      JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
    veiculos.forEach(adicionarNaTabela);
  }

  carregarDados();

});

function capturarData() {
  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const data = new Date();
  const diaSemana = diasDaSemana[data.getDay()];
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();
  const dataAtual = `${diaSemana}, ${dia}/${mes}/${ano}`;
  document.getElementById("data").textContent = dataAtual;
}

// Função para capturar a hora atual
function capturarHora() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, "0");
  const minutos = data.getMinutes().toString().padStart(2, "0");
  const segundos = data.getSeconds().toString().padStart(2, "0");
  const horaAtual = `${hora}:${minutos}:${segundos}`;
  document.getElementById("hora").textContent = horaAtual;
}

setInterval(capturarData, 1000);
setInterval(capturarHora, 1000);
