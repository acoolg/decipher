// const { ipcMain } = require("electron")

var btn = document.getElementById("btn")

btn.addEventListener("click", () => {
    window.electronAPI.test("heeeeee")
})