    // Função para exibir dados formatados da data
   export function formatarData(data) {
        return new Date(data).toLocaleString('pt-BR', {
            
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }