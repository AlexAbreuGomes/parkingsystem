// Função para enviar o relatório para o servidor usando fetch
export async function enviarRelatorioAoServidor(relatorio) {
    if (!relatorio || relatorio.length === 0) {
        alert("Não há dados para enviar.");
        return;
    }

    try {
        // Fazendo a requisição POST com fetch
        const response = await fetch('http://localhost:3000/adicionarVeiculo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                veiculos: relatorio
            })
        });

        // Verifica se a resposta foi bem-sucedida (status 200)
        if (response.ok) {
            alert("Relatório enviado com sucesso para o servidor!");
        } else {
            throw new Error('Erro ao enviar o relatório');
        }
    } catch (error) {
        // Caso ocorra um erro na requisição
        console.error("Erro ao fazer a requisição:", error);
        alert("Erro ao enviar o relatório para o servidor.");
    }
}

// Associando a função ao botão "Salvar"
document.getElementById("btnSalvar").addEventListener("click", () => {
    const relatorio = JSON.parse(localStorage.getItem("relatorioEstacionamento")) || [];

    // Verifica se há dados no relatório
    if (relatorio.length > 0) {
        enviarRelatorioAoServidor(relatorio);
    } else {
        alert("Não há dados para enviar.");
    }
});
