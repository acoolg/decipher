const fs = require("fs");
const path = require("path");
// const { spawn, fork } = require('node:child_process');
const runTime = require("../runtime/runtime");

// read and run plugin
const pluginPath = path.join(__dirname, "../../", "plugin");

// extract plugin
fs.readdir(pluginPath, (err, files) => {
    if (err) throw err;
    readPlugin(files);
});

function readPlugin(files) {
    files.forEach((e) => {
        fs.readFile(
            path.join(pluginPath, e, "describe.json"),
            "utf-8",
            (err, data) => {
                if (data == undefined || data == null) return;
                console.log(data);
                doPlugin(data, e);
            },
        );
    });
}

// run plugin
function doPlugin(data, pluginFilePath) {
    const json = JSON.parse(data);
    var mainProcessPath = path.join(pluginPath, pluginFilePath, json.main);
    const runtime = new runTime();
    runtime.run(mainProcessPath, path.join(pluginPath, pluginFilePath), json.name);
}
