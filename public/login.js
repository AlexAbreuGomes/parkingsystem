// Nomeando a função de inicialização

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('submit').addEventListener('click', function(event) {
            event.preventDefault();

            // Aqui você pode adicionar a lógica de autenticação
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Exemplo de autenticação simples
            if (email === 'admin' && password === 'admin') {
                // Redireciona para a tela de uso após login bem-sucedido
                window.location.href = 'registro.html';
            } else {
                alert('Usuário ou senha incorretos');
            }
        });
    });


// Exportando a função para ser utilizada em testes

