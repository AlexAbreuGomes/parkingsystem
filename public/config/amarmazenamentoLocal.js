// armazenamentoLocal.js

// Função para padronizar a placa (remover traços e converter para maiúsculas)
export function padronizarPlaca(placa) {
    return placa.replace(/-/g, "").toUpperCase();
}

// Função para verificar se o veículo já está registrado
export function veiculoJaRegistrado(placa) {
    const placaPadronizada = padronizarPlaca(placa);
    const veiculos = JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
    return veiculos.some(veiculo => padronizarPlaca(veiculo.placa) === placaPadronizada);
}

export function salvarNoRelatorio(veiculo) {
    let relatorio = JSON.parse(localStorage.getItem("relatorioEstacionamento")) || [];
    relatorio.push(veiculo);
    localStorage.setItem("relatorioEstacionamento", JSON.stringify(relatorio));
}

export function carregarDados(adicionarNaTabela) {
    const veiculos = JSON.parse(localStorage.getItem("veiculosEstacionados")) || [];
    veiculos.forEach(adicionarNaTabela);
}