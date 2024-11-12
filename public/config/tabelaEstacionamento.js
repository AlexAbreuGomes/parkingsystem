
 export function removerVeiculoTabela(placa) {
    removerDaTabela(placa);
}

function removerDaTabela(placa) {
    const rows = tabelaEstacionados.rows;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].innerText === placa) {
            tabelaEstacionados.deleteRow(i);
            break;
        }
    }
}