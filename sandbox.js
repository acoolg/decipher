const { NodeVM } = require('vm2');

function createSandboxedPlugin(api) {
    return new NodeVM({
        console: 'redirect',
        sandbox: { api }, // 只暴露 api
        require: {
          external: false,
          builtin: [] // 完全不允許內建模組
        },
        timeout: 3000
    });
}

const safeApi = {

}

process.on('message', ({ code }) => {
    try {
        const result = eval(code);
        process.send({ result: result });
    } catch (err) {
        process.send({ error: err.message });
  }
});