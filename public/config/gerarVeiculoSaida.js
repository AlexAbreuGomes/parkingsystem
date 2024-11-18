// gerarVeiculoSaida.js
export function gerarVeiculoSaida(veiculo, saida, valorPago) {
    return {
        placa: veiculo.placa,
        veiculo: veiculo.veiculo,
        entrada: new Date(veiculo.entrada).getTime(), // Salva o timestamp
        saida: new Date(saida).getTime(), // Salva o timestamp
        valorPago
    };
}
