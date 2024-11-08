// Função para capturar e exibir a data e hora atuais
export function atualizarDataHora() {
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
    
    // Formatação da data
    const diaSemana = diasDaSemana[data.getDay()];
    const dia = data.getDate();
    const mes = (data.getMonth() + 1).toString().padStart(2, "0"); // Adiciona zero à esquerda no mês
    const ano = data.getFullYear();
    const dataAtual = `${diaSemana}, ${dia}/${mes}/${ano}`;
    
    // Formatação da hora
    const hora = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    const segundos = data.getSeconds().toString().padStart(2, "0");
    const horaAtual = `${hora}:${minutos}:${segundos}`;
    
    // Atualiza os elementos no DOM
    const dataElement = document.getElementById("data");
    const horaElement = document.getElementById("hora");

    if (dataElement) dataElement.textContent = dataAtual;
    if (horaElement) horaElement.textContent = horaAtual;
}

// Atualiza a data e hora a cada segundo
setInterval(atualizarDataHora, 1000);
