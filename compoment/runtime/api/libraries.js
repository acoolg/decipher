const UI = require("../../plugin/functions/ui_element");
const mathjs = require("mathjs");
const TextCryptography = require("text-cryptography");
const crypto = require("crypto");

const ALLOWED_LIBS = {
    // "@decipher/fft": fft,
    "@decipher/ui": UI,
    "mathjs": mathjs,
    "text-cryptography": TextCryptography,
    "crypto": crypto
};

module.exports = ALLOWED_LIBS;