// gerarVeiculoSaida.js
import { formatarData } from "./formatarData.js";

export function gerarVeiculoSaida(veiculo, saida, valorPago) {
    return {
        placa: veiculo.placa,
        veiculo: veiculo.veiculo,
        entrada: formatarData(veiculo.entrada),
        saida: formatarData(saida),
        valorPago
    };
}
