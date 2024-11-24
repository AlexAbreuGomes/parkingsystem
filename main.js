const { app, BrowserWindow, Menu, nativeTheme, ipcMain } = require('electron');
const path = require('path');


function createWindow() {
  // Define o tema para 'dark'
  nativeTheme.themeSource = 'dark';

  // Criação da janela principal
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  // Maximiza a janela ao abrir
  mainWindow.maximize();

  // Corrigir o caminho para o HTML
  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

  // Criação do menu personalizado
  const template = [
    {
      label: 'MENU',
      submenu: [
        {
          label: 'Recarregar',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload();
          },
        },
        {
          label: 'Fechar',
          accelerator: 'CmdOrCtrl+W',
          click: () => {
            app.quit();
          },
        },
        {
          label: 'Imprimir',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            mainWindow.webContents.print();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Inicializa a aplicação
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});

