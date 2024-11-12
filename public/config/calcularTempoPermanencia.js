// calcularTempoPermanencia.js
export function calcularTempoPermanencia(entrada, saida) {
    const diffMs = new Date(saida) - new Date(entrada);
    const diffMinutos = diffMs / (1000 * 60);
    const diffHoras = Math.floor(diffMinutos / 60);
    const minutosRestantes = Math.floor(diffMinutos % 60);
    const diffDias = Math.floor(diffHoras / 24);
    const horasRestantes = diffHoras % 24;
    return `${diffDias} dia(s), ${horasRestantes} hora(s) e ${minutosRestantes} minuto(s)`;
}
