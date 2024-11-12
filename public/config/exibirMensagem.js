// exibirMensagem.js
export function exibirMensagem(veiculo, valorFormatado, tempoPermanencia, valorPagarElement) {
    valorPagarElement.innerText = `Placa: ${veiculo.placa}\nVeículo: ${veiculo.veiculo}\nValor total a pagar: ${valorFormatado}\nTempo de permanência: ${tempoPermanencia}`;
    setTimeout(() => valorPagarElement.innerText = '', 8000);
}
