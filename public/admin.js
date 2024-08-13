document.addEventListener("DOMContentLoaded", () => {
    const tarifaForm = document.getElementById("tarifaForm");
    const tarifaMinimaAtual = document.getElementById("tarifaMinimaAtual");
    const tarifaHoraAtual = document.getElementById("tarifaHoraAtual");
    const tarifaDiaAtual = document.getElementById("tarifaDiaAtual");
    const vagaImput = document.getElementById("totalVagas");
    const vagas = document.getElementById("vagasForm");
    
  
    // Carregar tarifas do localStorage ou usar valores padrão
    let tarifaMinima = parseFloat(localStorage.getItem("tarifaMinima")) || 3;
    let tarifaHora = parseFloat(localStorage.getItem("tarifaHora")) || 6;
    let tarifaDia = parseFloat(localStorage.getItem("tarifaDia")) || 100;
    
  
    // Atualizar exibição das tarifas
    tarifaMinimaAtual.innerText = `R$: ${tarifaMinima},00`;
    tarifaHoraAtual.innerText =  `R$: ${tarifaHora},00`;
    tarifaDiaAtual.innerText = `R$: ${tarifaDia},00`;
  
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
      tarifaMinimaAtual.innerText = `R$: ${tarifaMinima},00`;
      tarifaHoraAtual.innerText = `R$: ${tarifaHora},00`;
      tarifaDiaAtual.innerText = `R$: ${tarifaDia},00`;
  
      tarifaForm.reset();

      
    });
  
    const resetDataButton = document.getElementById("resetData");
    resetDataButton.addEventListener("click", () => {
      localStorage.removeItem("tarifaMinima");
      localStorage.removeItem("tarifaHora");
      localStorage.removeItem("tarifaDia");
  
      tarifaMinima = 3;
      tarifaHora = 6;
      tarifaDia = 100;
  
      tarifaMinimaAtual.innerText = `R$: ${tarifaMinima},00`;
      tarifaHoraAtual.innerText = `R$: ${tarifaHora},00`;
      tarifaDiaAtual.innerText = `R$: ${tarifaDia},00`;
  
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