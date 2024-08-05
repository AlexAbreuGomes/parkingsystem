// let numVagas = 20;

// document.getElementById("adicionar-carro").addEventListener("click", function () {
//     adicionarCarro();
// });

// document.getElementById("remover-carro").addEventListener("click", function () {
//     removerCarro();
// });

// function adicionarCarro() {
//     const placa = document.getElementById("placa").value;
//     const carro = document.getElementById("carro").value;
//     const agora = new Date();
//     const horaAtual = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
//     const entrada = horaAtual;

//     // Verifica se a placa é válida
//     if (!validaPlacaBrasil(placa)) {
//         alert("Placa inválida. O formato deve ser XXXXX-#### ou XXXXXXXX");
//         return;
//     }

//     // Verifica se ainda há vagas disponíveis
//     if (numVagas > 0) {
//         // Decrementa o número de vagas
//         numVagas--;
//         // Atualiza o número de vagas na tela
//         document.getElementById("vaga").textContent = numVagas.toString();

//         const tabela = document.getElementById("tabela");
//         // Insere uma nova linha na tabela
//         const row = tabela.insertRow(-1);
//         // Cria as células da nova linha
//         const cellPlaca = row.insertCell(0);
//         const cellCarro = row.insertCell(1);
//         const cellEntrada = row.insertCell(2);

//         // Define o conteúdo das células
//         cellPlaca.textContent = placa;
//         cellCarro.textContent = carro;
//         cellEntrada.textContent = entrada;

//         const carData = {
//             placa: placa,
//             carro: carro,
//             entrada: entrada
//         };
//         localStorage.setItem(placa, JSON.stringify(carData));
   
//     } else {
//         // Exibe uma mensagem de alerta caso não haja mais vagas disponíveis
//         alert("Não há mais vagas disponíveis.");
//     }
// }

// function validaPlacaBrasil(placa) {
//     const padrao = /^[A-Z]{3}\d{4}$/;
//     const padraoExtendido = /^[A-Z]{3}-\d{4}$/;
//     return padrao.test(placa) || padraoExtendido.test(placa);
// }

// function removerCarro() {
//     const placa = document.getElementById("placa").value;

//     // Verifica se a placa está armazenada no localStorage
//     if (localStorage.getItem(placa)) {
//         // Remove o carro do localStorage
//         localStorage.removeItem(placa);

//         const tabela = document.getElementById("tabela");
//         const rows = tabela.rows;

//         // Percorre as linhas da tabela em ordem decrescente
//         for (let i = rows.length - 1; i > 0; i--) {
//             const row = rows[i];
//             const cellPlaca = row.cells[0];
//             const placaRow = cellPlaca.textContent;

//             // Verifica se a placa da linha atual corresponde à placa do veículo a ser removido
//             if (placaRow === placa) {
//                 row.parentNode.removeChild(row);
//                 break;
//             }
//         }
//     } else {
//         console.log("Placa não encontrada no localStorage");
//     }
// }





// function capturarData() {
//     const diasDaSemana = [
//         "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
//         "Quinta-feira", "Sexta-feira", "Sábado"
//     ];
//     const data = new Date();
//     const diaSemana = diasDaSemana[data.getDay()];
//     const dia = data.getDate();
//     const mes = data.getMonth() + 1;
//     const ano = data.getFullYear();
//     const dataAtual = `${diaSemana}, ${dia}/${mes}/${ano}`;
//     document.getElementById("data").textContent = dataAtual;
// }

// // Função para capturar a hora atual
// function capturarHora() {
//     // Obtenha a data atual
//     const data = new Date();
//     // Obtenha a hora atual
//     const hora = data.getHours().toString().padStart(2, '0');;
//     // Obtenha os minutos atual
//     const minutos = data.getMinutes().toString().padStart(2, '0');
//     // Obtenha os segundos atual e adicione o zero à esquerda se necessário
//     const segundos = data.getSeconds().toString().padStart(2, '0');
//     // Crie a string com a hora atual no formato HH:MM:SS
//     const horaAtual = `${hora}:${minutos}:${segundos}`;
//     // Insira a hora atual na etiqueta com o ID "hora"
//     document.getElementById("hora").textContent = horaAtual;
// }

// setInterval(capturarData, 1000);
// setInterval(capturarHora, 1000);


let numVagas = 20;
const taxaPorHora = 5; // Defina a taxa por hora aqui

// Funções de manipulação de data e hora
function capturarData() {
    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const data = new Date();
    const dataAtual = `${diasDaSemana[data.getDay()]}, ${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    document.getElementById("data").textContent = dataAtual;
}

function capturarHora() {
    const data = new Date();
    const horaAtual = `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}:${data.getSeconds().toString().padStart(2, '0')}`;
    document.getElementById("hora").textContent = horaAtual;
}

// Função de validação
function validaPlacaBrasil(placa) {
    const padrao = /^[A-Z]{3}\d{4}$/;
    const padraoExtendido = /^[A-Z]{3}-\d{4}$/;
    return padrao.test(placa) || padraoExtendido.test(placa);
}

// Funções de manipulação de carros
function adicionarCarro(event) {
    event.preventDefault();
    const placa = document.getElementById("placa").value;
    const veiculo = document.getElementById("veiculo").value;
    const agora = new Date();
    const entrada = agora.getTime(); // Armazena o timestamp de entrada

    if (!validaPlacaBrasil(placa)) {
        alert("Placa inválida. O formato deve ser XXXXX-#### ou XXXXXXXX");
        return;
    }

    if (numVagas > 0) {
        numVagas--;
        atualizarVagas(numVagas);

        const tabela = document.getElementById("tabelaEstacionados").querySelector("tbody");
        const row = tabela.insertRow();
        adicionarCelulas(row, placa, veiculo, agora.toLocaleTimeString());

        const carData = { placa, veiculo, entrada };
        localStorage.setItem(placa, JSON.stringify(carData));
    } else {
        alert("Não há mais vagas disponíveis.");
    }
}

function removerCarro(event) {
    event.preventDefault();
    const placa = document.getElementById("saidaPlaca").value;

    if (localStorage.getItem(placa)) {
        const agora = new Date();
        const carData = JSON.parse(localStorage.getItem(placa));
        const tempoEstacionado = (agora.getTime() - carData.entrada) / 1000; // Tempo em segundos
        const valorPago = ((tempoEstacionado / 3600) * taxaPorHora).toFixed(2);

        localStorage.removeItem(placa);

        const tabela = document.getElementById("tabelaEstacionados").querySelector("tbody");
        for (let row of tabela.rows) {
            if (row.cells[0].textContent === placa) {
                atualizarSaidaValor(row, agora.toLocaleTimeString(), `R$ ${valorPago}`);
                numVagas++;
                atualizarVagas(numVagas);
                document.getElementById("valorPagar").textContent = `R$ ${valorPago}`;
                break;
            }
        }
    } else {
        alert("Placa não encontrada no sistema.");
    }
}

// Funções de atualização da interface do usuário
function atualizarVagas(vagas) {
    document.getElementById("vaga").textContent = vagas.toString();
}

function adicionarCelulas(row, placa, veiculo, horaAtual) {
    row.insertCell(0).textContent = placa;
    row.insertCell(1).textContent = veiculo;
    row.insertCell(2).textContent = horaAtual;
    row.insertCell(3).textContent = ""; // Placeholder for saída
    row.insertCell(4).textContent = ""; // Placeholder for valor pago
}

function atualizarSaidaValor(row, horaAtual, valorPago) {
    row.cells[3].textContent = horaAtual; // Saída
    row.cells[4].textContent = valorPago; // Valor Pago
}

function carregarCarros() {
    const tabela = document.getElementById("tabelaEstacionados").querySelector("tbody");
    tabela.innerHTML = ""; // Limpa a tabela

    Object.keys(localStorage).forEach(placa => {
        const carData = JSON.parse(localStorage.getItem(placa));
        if (carData && carData.entrada) {
            const agora = new Date(carData.entrada);
            const row = tabela.insertRow();
            adicionarCelulas(row, carData.placa, carData.veiculo, agora.toLocaleTimeString());
        }
    });

    atualizarVagas(numVagas - Object.keys(localStorage).length);
}

// Event listeners
document.getElementById("entradaForm").addEventListener("submit", adicionarCarro);
document.getElementById("saidaForm").addEventListener("submit", removerCarro);

// Intervalos de atualização
setInterval(capturarData, 1000);
setInterval(capturarHora, 1000);

// Carregar carros ao iniciar a página
window.onload = carregarCarros;
