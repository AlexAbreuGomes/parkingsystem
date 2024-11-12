// calculosEstacionamento.js
export function calcularValorEstacionamento(entrada, saida, tarifaMinima, tarifaHora, tarifaDia) {
    const diffMs = new Date(saida) - new Date(entrada);
    const diffMinutos = diffMs / (1000 * 60);

    if (diffMinutos <= 15) {
        return tarifaMinima;
    }

    const diffHoras = Math.ceil(diffMinutos / 60);
    const diasCompletos = Math.floor(diffHoras / 24);
    const horasRestantes = diffHoras % 24;

    let valorTotal = calcularValorDias(diasCompletos, tarifaDia);
    valorTotal += calcularValorTempoRestante(diasCompletos, horasRestantes, tarifaMinima, tarifaHora);

    return valorTotal;
}

function calcularValorDias(diasCompletos, tarifaDia) {
    return diasCompletos * tarifaDia;
}

function calcularValorTempoRestante(diasCompletos, horasRestantes, tarifaMinima, tarifaHora) {
    if (diasCompletos > 0 && horasRestantes <= 15) {
        return tarifaMinima;
    } else if (horasRestantes > 0) {
        return horasRestantes * tarifaHora;
    }
    return 0;
}
