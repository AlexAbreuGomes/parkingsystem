
const { contextBridge, ipcRenderer } = require('electron');
const mostrarNotificacao = require('./notificacao/mostrarNotificacao.js');

// Expondo uma API segura para o processo de renderização
contextBridge.exposeInMainWorld('electronAPI', {
    printPage: () => ipcRenderer.send('print-page'),
    reloadPage: () => ipcRenderer.send('reload-page'),
    closeApp: () => ipcRenderer.send('close-app'),
    
});
