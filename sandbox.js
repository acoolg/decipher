process.on('message', ({ code }) => {
    try {
        const result = eval(code);
        process.send(result);
    } catch (err) {
        process.send({ error: err.message });
  }
});