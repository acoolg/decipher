const fakeRequire = require("./api/require")

module.exports = class DumbRuntime {
    async run(code) {
        return new Function("require", code)(fakeRequire);
    }
}
