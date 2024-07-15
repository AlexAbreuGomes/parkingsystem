let numVagas = 20;

document.getElementById("adicionar-carro").addEventListener("click", function () {
    adicionarCarro();
});

document.getElementById("remover-carro").addEventListener("click", function () {
    removerCarro();
});

function adicionarCarro() {
    const placa = document.getElementById("placa").value;
    const carro = document.getElementById("carro").value;
    const agora = new Date();
    const horaAtual = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const entrada = horaAtual;

    // Verifica se a placa é válida
    if (!validaPlacaBrasil(placa)) {
        alert("Placa inválida. O formato deve ser XXXXX-#### ou XXXXXXXX");
        return;
    }

    // Verifica se ainda há vagas disponíveis
    if (numVagas > 0) {
        // Decrementa o número de vagas
        numVagas--;
        // Atualiza o número de vagas na tela
        document.getElementById("vaga").textContent = numVagas.toString();

        const tabela = document.getElementById("tabela");
        // Insere uma nova linha na tabela
        const row = tabela.insertRow(-1);
        // Cria as células da nova linha
        const cellPlaca = row.insertCell(0);
        const cellCarro = row.insertCell(1);
        const cellEntrada = row.insertCell(2);

        // Define o conteúdo das células
        cellPlaca.textContent = placa;
        cellCarro.textContent = carro;
        cellEntrada.textContent = entrada;

        const carData = {
            placa: placa,
            carro: carro,
            entrada: entrada
        };
        localStorage.setItem(placa, JSON.stringify(carData));
   
    } else {
        // Exibe uma mensagem de alerta caso não haja mais vagas disponíveis
        alert("Não há mais vagas disponíveis.");
    }
}

function validaPlacaBrasil(placa) {
    const padrao = /^[A-Z]{3}\d{4}$/;
    const padraoExtendido = /^[A-Z]{3}-\d{4}$/;
    return padrao.test(placa) || padraoExtendido.test(placa);
}
// function removerCarro() {
//     const placa = document.getElementById("placa").value;

//     // Remove the car from localStorage
//     if (localStorage.getItem(placa)) {
//         localStorage.removeItem(placa);
//     }
    

//     const tabela = document.getElementById("tabela");
//     const rows = tabela.rows;

//     // Percorre as linhas da tabela em ordem decrescente
//     for (let i = rows.length - 1; i > 0; i--) {
//         const row = rows[i];
//         const cellPlaca = row.cells[0];
//         const placaRow = cellPlaca.textContent;

//         // Verifica se a placa da linha atual corresponde à placa do veículo a ser removido
//         if (placaRow === placa) {
//             row.parentNode.removeChild(row);
//             break;
//         }
//     }
// }

function removerCarro() {
    const placa = document.getElementById("placa").value;

    // Verifica se a placa está armazenada no localStorage
    if (localStorage.getItem(placa)) {
        // Remove o carro do localStorage
        localStorage.removeItem(placa);

        const tabela = document.getElementById("tabela");
        const rows = tabela.rows;

        // Percorre as linhas da tabela em ordem decrescente
        for (let i = rows.length - 1; i > 0; i--) {
            const row = rows[i];
            const cellPlaca = row.cells[0];
            const placaRow = cellPlaca.textContent;

            // Verifica se a placa da linha atual corresponde à placa do veículo a ser removido
            if (placaRow === placa) {
                row.parentNode.removeChild(row);
                break;
            }
        }
    } else {
        console.log("Placa não encontrada no localStorage");
    }
}





function capturarData() {
    const diasDaSemana = [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
        "Quinta-feira", "Sexta-feira", "Sábado"
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
    // Obtenha a data atual
    const data = new Date();
    // Obtenha a hora atual
    const hora = data.getHours().toString().padStart(2, '0');;
    // Obtenha os minutos atual
    const minutos = data.getMinutes().toString().padStart(2, '0');
    // Obtenha os segundos atual e adicione o zero à esquerda se necessário
    const segundos = data.getSeconds().toString().padStart(2, '0');
    // Crie a string com a hora atual no formato HH:MM:SS
    const horaAtual = `${hora}:${minutos}:${segundos}`;
    // Insira a hora atual na etiqueta com o ID "hora"
    document.getElementById("hora").textContent = horaAtual;
}

setInterval(capturarData, 1000);
setInterval(capturarHora, 1000);