const { ipcMain } = require("electron");

module.exports.Bar = class Bar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    say(text) {
        ipcMain
        console.log(text);
    }
}