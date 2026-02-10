// const fft = require("fft-js"); // 預先在宿主端載入好

const ALLOWED_LIBS = {
    // "@decipher/fft": fft,
    "@decipher/ui": require("./ui_element"),
    "mathjs": require("mathjs"),
    "text-cryptography": require("text-cryptography")
};

module.exports = ALLOWED_LIBS;