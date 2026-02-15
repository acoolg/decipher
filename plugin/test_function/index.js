console.log("load success");
const { ipcMain } = require("electron");
const module1 = require("./test_module");
const module2 = require("./test_module_2");
module1.module();
module2();
console.log(__dirname);
console.log(__filename);

ipcMain.on("test", (event, args) => {
    console.log(args);
});