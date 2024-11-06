document.addEventListener("DOMContentLoaded", () => {

  const tarifaForm = document.getElementById("tarifaForm");
  const tarifaMinimaAtual = document.getElementById("tarifaMinimaAtual");
  const tarifaHoraAtual = document.getElementById("tarifaHoraAtual");
  const tarifaDiaAtual = document.getElementById("tarifaDiaAtual");

  const resetDataButton = document.getElementById("resetData");
  const vagasForm = document.getElementById("vagasForm");

  // Funções relacionadas às tarifas
  function carregarTarifas() {
      return {
          tarifaMinima: parseFloat(localStorage.getItem("tarifaMinima")) || 3,
          tarifaHora: parseFloat(localStorage.getItem("tarifaHora")) || 6,
          tarifaDia: parseFloat(localStorage.getItem("tarifaDia")) || 100
      };
  }

  function atualizarExibicaoTarifas({ tarifaMinima, tarifaHora, tarifaDia }) {
      tarifaMinimaAtual.innerText = `R$: ${tarifaMinima},00`;
      tarifaHoraAtual.innerText = `R$: ${tarifaHora},00`;
      tarifaDiaAtual.innerText = `R$: ${tarifaDia},00`;
  }

  // Carregar e exibir tarifas iniciais
  let { tarifaMinima, tarifaHora, tarifaDia } = carregarTarifas();
  atualizarExibicaoTarifas({ tarifaMinima, tarifaHora, tarifaDia });

  tarifaForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      // Obter valores do formulário e validar
      const novaTarifaMinima = parseFloat(document.getElementById("tarifaMinima").value);
      const novaTarifaHora = parseFloat(document.getElementById("tarifaHora").value);
      const novaTarifaDia = parseFloat(document.getElementById("tarifaDia").value);

      if (isNaN(novaTarifaMinima) || isNaN(novaTarifaHora) || isNaN(novaTarifaDia)) {
          alert("Por favor, insira valores válidos para todas as tarifas.");
          return;
      }

      // Atualizar tarifas e salvar no localStorage
      tarifaMinima = novaTarifaMinima;
      tarifaHora = novaTarifaHora;
      tarifaDia = novaTarifaDia;
      localStorage.setItem("tarifaMinima", tarifaMinima);
      localStorage.setItem("tarifaHora", tarifaHora);
      localStorage.setItem("tarifaDia", tarifaDia);

      atualizarExibicaoTarifas({ tarifaMinima, tarifaHora, tarifaDia });
      tarifaForm.reset();
  });

  resetDataButton.addEventListener("click", () => {
      localStorage.removeItem("tarifaMinima");
      localStorage.removeItem("tarifaHora");
      localStorage.removeItem("tarifaDia");

      tarifaMinima = 3;
      tarifaHora = 6;
      tarifaDia = 100;
      atualizarExibicaoTarifas({ tarifaMinima, tarifaHora, tarifaDia });

      alert("Dados resetados com sucesso.");
  });

  // Funções relacionadas ao formulário de vagas
  vagasForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      const totalVagas = parseInt(document.getElementById("totalVagas").value);
      if (isNaN(totalVagas)) {
          alert("Por favor, insira um número válido para o total de vagas.");
          return;
      }

      localStorage.setItem("totalVagas", totalVagas);
      alert("Quantidade de vagas salva com sucesso!");
      vagasForm.reset();
  });
});

