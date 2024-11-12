// formatarData.js

export function formatarData(data) {
    // Converte a string de data para o formato ISO se estiver em mm/dd/yyyy
    const dataObj = new Date(data);

    // Formata a data no padrão 'dd/mm/yyyy HH:MM:SS'
    return dataObj.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }) + ' ' + dataObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
