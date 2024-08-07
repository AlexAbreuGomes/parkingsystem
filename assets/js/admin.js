document.addEventListener("DOMContentLoaded", () => {
    const tarifaForm = document.getElementById("tarifaForm");
    const tarifaMinimaAtual = document.getElementById("tarifaMinimaAtual");
    const tarifaHoraAtual = document.getElementById("tarifaHoraAtual");
    const tarifaDiaAtual = document.getElementById("tarifaDiaAtual");
    
  
    // Carregar tarifas do localStorage ou usar valores padrão
    let tarifaMinima = parseFloat(localStorage.getItem("tarifaMinima")) || 3;
    let tarifaHora = parseFloat(localStorage.getItem("tarifaHora")) || 6;
    let tarifaDia = parseFloat(localStorage.getItem("tarifaDia")) || 100;
  
    // Atualizar exibição das tarifas
    tarifaMinimaAtual.innerText = tarifaMinima;
    tarifaHoraAtual.innerText = tarifaHora;
    tarifaDiaAtual.innerText = tarifaDia;
  
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
      tarifaMinimaAtual.innerText = tarifaMinima;
      tarifaHoraAtual.innerText = tarifaHora;
      tarifaDiaAtual.innerText = tarifaDia;
  
      tarifaForm.reset();

      location.reload();
    });
  
    const resetDataButton = document.getElementById("resetData");
    resetDataButton.addEventListener("click", () => {
      localStorage.removeItem("tarifaMinima");
      localStorage.removeItem("tarifaHora");
      localStorage.removeItem("tarifaDia");
  
      tarifaMinima = 3;
      tarifaHora = 6;
      tarifaDia = 100;
  
      tarifaMinimaAtual.innerText = tarifaMinima;
      tarifaHoraAtual.innerText = tarifaHora;
      tarifaDiaAtual.innerText = tarifaDia;
  
      alert("Dados resetados com sucesso.");
    });

    const vagasForm = document.getElementById("vagasForm");

    vagasForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const totalVagas = parseInt(document.getElementById("totalVagas").value);
        localStorage.setItem("totalVagas", totalVagas);
        alert("Quantidade de vagas salva com sucesso!");
        vagasForm.reset();
    });
});