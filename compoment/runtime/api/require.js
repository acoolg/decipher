module.exports = function(name) {
    if (name === "meeek")
        return {
            run: (code) => {
                console.log(code);
            },
        };
};
