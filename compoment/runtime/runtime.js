const fakeRequire = require("./api/require")
const fs = require("fs")

module.exports = class DumbRuntime {
    async run(dir) {
        fs.readFile(dir, "utf-8", (err, code) => {
            return new Function("require", code)(fakeRequire());
        })
    }
}
