const { app, BrowserWindow, Menu, nativeTheme } = require('electron');
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
      contextIsolation: true, // Melhor prática de segurança
      enableRemoteModule: false, // Desabilita o módulo remoto por segurança
      nodeIntegration: false, // Desabilita a integração do Node.js no processo de renderização
    }
  });

  // Maximiza a janela ao abrir
  mainWindow.maximize();

  // Carrega o arquivo HTML principal
  mainWindow.loadFile('index.html');

  // Adiciona um ouvinte para quando o conteúdo da página estiver completamente carregado
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Página carregada');
    // Forçar atualização da tela, se necessário
    // Você pode adicionar lógica adicional aqui se precisar
    // mainWindow.webContents.send('force-update');
  });

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
          }
        },
        {
          label: 'Fechar',
          accelerator: 'CmdOrCtrl+W',
          click: () => {
            app.quit();
          }
        },
        {
          label: 'Imprimir',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            mainWindow.webContents.print();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Inicializa a aplicação
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // Reabre a janela se não houver nenhuma aberta
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Fecha a aplicação quando todas as janelas forem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
