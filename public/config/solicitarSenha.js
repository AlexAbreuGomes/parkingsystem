const SENHA = "admin"; // Substitua por uma senha segura

export function solicitarSenha() {
    return new Promise((resolve, reject) => {
        const modalSenha = document.getElementById("modalSenha");
        const inputSenha = document.getElementById("inputSenha");
        const btnConfirmar = document.getElementById("btnConfirmarSenha");
        const btnCancelar = document.getElementById("btnCancelarSenha");

        // Exibe o modal
        modalSenha.style.display = "flex";
        inputSenha.value = ""; // Limpa o campo de senha

        // Evento para confirmar
        btnConfirmar.onclick = () => {
            const senhaInserida = inputSenha.value;
            modalSenha.style.display = "none";
            if (senhaInserida === SENHA) {
                resolve(true);
            } else {
                resolve(false);
            }
        };

        // Evento para cancelar
        btnCancelar.onclick = () => {
            modalSenha.style.display = "none";
            reject("Ação cancelada pelo usuário.");
        };
    });
}
