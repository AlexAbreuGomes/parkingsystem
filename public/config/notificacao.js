// public/notificacao.js
export function mostrarNotificacao(mensagem) {
    const notification = document.getElementById("notification");
    notification.innerText = mensagem;
    notification.style.display = "block";
    
    // Ocultar a notificação após 3 segundos
    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}
