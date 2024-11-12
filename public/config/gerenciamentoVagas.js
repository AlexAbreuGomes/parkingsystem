// gerenciamentoVagas.js
export function atualizarVagasDisponiveis(vagasAtual, vagasDisponiveisElement) {
    const veiculos = JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
    const vagasDisponiveis = Math.max(vagasAtual - veiculos.length, 0);
    vagasDisponiveisElement.innerText = vagasDisponiveis;
    return vagasDisponiveis;
}

export function obterVeiculoPorPlaca(placa) {
    let veiculos = JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
    const veiculoIndex = veiculos.findIndex(item => item.placa === placa);

    if (veiculoIndex === -1) return null;

    const [veiculo] = veiculos.splice(veiculoIndex, 1);
    atualizarLocalStorage(veiculos);
    return veiculo;
}

export function atualizarLocalStorage(veiculos) {
    localStorage.setItem("veiculosEstacionados", JSON.stringify(veiculos));
}
