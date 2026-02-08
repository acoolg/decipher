const fs = require("fs");
const path = require("path");

const blockList = new Set([
    "fs",
    "vm",
    "isolated-vm",
    "vm2",
    "child_process",
    "electron",
]);

module.exports = function createRequire(baseDir) {
    return function require(name) {
        if (blockList.has(name)) {
            throw new Error(`Blocked require: ${name}`);
        }

        if (name === "console") {
            return console;
        }

        if (name.startsWith("./")) {
            const filePath = path.resolve(baseDir, name);
            const code = fs.readFileSync(filePath, "utf-8");

            const module = { exports: {} };
            const localRequire = createRequire(path.dirname(filePath));

            new Function("require", "module", "exports", code)(
                localRequire,
                module,
                module.exports,
            );

            return module.exports;
        }

        throw new Error(`Unknown module: ${name}`);
    };
};
