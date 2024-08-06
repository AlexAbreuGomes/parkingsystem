document.addEventListener("DOMContentLoaded", () => {
  const entradaForm = document.getElementById("entradaForm");
  const saidaForm = document.getElementById("saidaForm");
  const tabelaEstacionados = document
    .getElementById("tabelaEstacionados")
    .getElementsByTagName("tbody")[0];
  const valorPagarElement = document.getElementById("valorPagar");

  // Carregar tarifas do localStorage ou usar valores padrão
  let tarifaMinima = parseFloat(localStorage.getItem("tarifaMinima")) || 3;
  let tarifaHora = parseFloat(localStorage.getItem("tarifaHora")) || 6;
  let tarifaDia = parseFloat(localStorage.getItem("tarifaDia")) || 100;

  entradaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const placa = document.getElementById("placa").value;
    const veiculo = document.getElementById("veiculo").value;
    const entrada = new Date().toISOString();

    if (!validaPlacaBrasil(placa)) {
      alert("Placa inválida. Por favor, insira uma placa no formato correto.");
      return;
    }

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

  // Painel de Administração
  const tarifaForm = document.getElementById("tarifaForm");
  const resetDataButton = document.getElementById("resetData");

  tarifaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    tarifaMinima = parseFloat(document.getElementById("tarifaMinima").value);
    tarifaHora = parseFloat(document.getElementById("tarifaHora").value);
    tarifaDia = parseFloat(document.getElementById("tarifaDia").value);

    // Salvar tarifas no localStorage
    localStorage.setItem("tarifaMinima", tarifaMinima);
    localStorage.setItem("tarifaHora", tarifaHora);
    localStorage.setItem("tarifaDia", tarifaDia);

    // Atualizar exibição das tarifas
    document.getElementById("tarifaMinimaAtual").innerText = tarifaMinima;
    document.getElementById("tarifaHoraAtual").innerText = tarifaHora;
    document.getElementById("tarifaDiaAtual").innerText = tarifaDia;

    tarifaForm.reset();
  });

  resetDataButton.addEventListener("click", () => {
    localStorage.removeItem("veiculosEstacionados");
    localStorage.removeItem("relatorioEstacionamento");
    tabelaEstacionados.innerHTML = "";
    valorPagarElement.innerText = "";
    alert("Dados resetados com sucesso.");
  });
});

function validaPlacaBrasil(placa) {
  const padrao = /^[A-Z]{3}\d{4}$/;
  const padraoExtendido = /^[A-Z]{3}-\d{4}$/;
  return padrao.test(placa) || padraoExtendido.test(placa);
}

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