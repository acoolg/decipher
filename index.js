const electron = require("electron");
var win;
require('./plugin.js');

const starterWindow = () => {
    const win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: "hidden",
        ...(process.platform !== "darwin" ? { titleBarOverlay: true } : {}),
        // fullscreen: true
        titleBarStyle: "hidden",
        titleBarOverlay: {
            color: "#2f3241",
            symbolColor: "#74b1be",
            height: 40,
        },
        minHeight: 300,
        minWidth: 400,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: false,
            preload: __dirname + "/preload.js",
        }
    });

    win.loadFile("src/index.html");
    if (process.platform !== "darwin") {
        win.maximize();
    } else {
        win.setFullScreen(true);
    }

    return win
    
};

electron.app.whenReady().then(starterWindow);

electron.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") electron.app.quit();
});