const fs = require("fs");
const path = require("path");
const { spawn, fork } = require('node:child_process');


// read and run plugin
const pluginPath = path.join(__dirname, "plugin");

// extract plugin
fs.readdir(pluginPath, (err, files) => {
    if (err) throw err;
    readPlugin(files);
});

function readPlugin(files) {
    files.forEach((e) => {
        fs.readFile(path.join(pluginPath, e, "describe.json"),"utf-8",(err, data) => {
                console.log(data);
                doPlugin(data, e)
            }
        );
    });
}

const child = fork('./sandbox.js');

// run plugin
function doPlugin(data, pluginFilePath) {
    const json = JSON.parse(data);
    var mainProcessPath = path.join(pluginPath, pluginFilePath, json.main)
    fs.readFile(mainProcessPath, "utf-8", (err, data) => {
        if (err) throw err;
        child.send({ code: data });
    })
}

function runPlugin() {

}

child.on('message', (result) => {
  console.log('Result from child:', result);
});