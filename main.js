const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');


function createWindow() {

  nativeTheme.themeSource = 'dark';
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //fullscreen: true, // Abre a janela em tela cheia
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Opcional, remova se não precisar
    }
  });

  mainWindow.maximize();

  mainWindow.loadFile('registro.html'); // Carrega o arquivo HTML


  // mainWindow.on('restore', () => {
  //   mainWindow.setFullScreen(true);
  // });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
