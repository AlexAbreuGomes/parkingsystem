// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expondo uma API segura para o processo de renderização
contextBridge.exposeInMainWorld('electronAPI', {
    printPage: () => ipcRenderer.send('print-page'),
    reloadPage: () => ipcRenderer.send('reload-page'),
    closeApp: () => ipcRenderer.send('close-app'),
});
