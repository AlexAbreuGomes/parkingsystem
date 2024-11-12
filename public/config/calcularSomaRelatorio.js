import { formatarValor } from "./formatarValor.js";

export function calcularSoma(relatorio, totalValorElemento) {
    let soma = 0;
    relatorio.forEach(veiculo => {
        const valor = parseFloat(veiculo.valorPago) || 0;
        soma += valor;
    });
    totalValorElemento.innerText = formatarValor(soma.toFixed(2));
}
