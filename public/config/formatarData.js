// formatarData.js
export function formatarData(data) {
    const dateObj = new Date(data);
    if (isNaN(dateObj.getTime())) {
        return "Data Inválida"; // Retorna mensagem de erro para datas inválidas
    }
    return dateObj.toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}
