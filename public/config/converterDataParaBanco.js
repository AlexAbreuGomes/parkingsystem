// Função para converter a data para o formato adequado para o banco de dados (YYYY-MM-DD HH:mm:ss)
export function converterDataParaBanco(data) {
    const dateObj = new Date(data);
    if (isNaN(dateObj.getTime())) {
        return null; // Retorna nulo em caso de data inválida
    }
    
    const ano = dateObj.getFullYear();
    const mes = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const dia = dateObj.getDate().toString().padStart(2, '0');
    const hora = dateObj.getHours().toString().padStart(2, '0');
    const minuto = dateObj.getMinutes().toString().padStart(2, '0');
    const segundo = dateObj.getSeconds().toString().padStart(2, '0');
    
    // Formata a data para o formato 'YYYY-MM-DD HH:mm:ss'
    return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
}
