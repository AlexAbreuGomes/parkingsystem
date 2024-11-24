export function exportarParaCSV(dataHoje, tabelaRelatorio, totalValorElemento) {
    let csvContent = "Placa;Veículo;Entrada;Saída;Valor Pago\r\n";

    const rows = tabelaRelatorio.querySelectorAll("tr");
    rows.forEach(row => {
        const cols = row.querySelectorAll("td");
        const data = Array.from(cols).map(col => col.innerText.trim()).join(";");
        csvContent += data + "\r\n";
    });

    const valorTotal = totalValorElemento.innerText.trim();
    csvContent += `Total do Dia:;${valorTotal}\r\n`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_${dataHoje}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}
