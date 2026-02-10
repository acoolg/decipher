const fs = require("fs");
const path = require("path");
const ALLOWED_LIBS = require("./api/libraries");

module.exports.fakeRequire = (namer) => {
    if (ALLOWED_LIBS[namer]) {
        console.log(`[${name}]` + "嘗試存取" + namer);
        return ALLOWED_LIBS[namer];
    } else if (namer.startsWith("./")) {
        const resolvedPath = path.resolve(dir, namer);
        console.log(`[${name}]` + "嘗試存取" + resolvedPath);
        const relative = path.relative(dir, resolvedPath);

        // 如果相對路徑是以 .. 開頭，代表它試圖跳出 dir 目錄
        const isOutside =
            relative.startsWith("..") || path.isAbsolute(relative);

        if (isOutside) {
            throw new Error(`[Security] 試圖非法存取目錄外檔案: ${namer}`);
        }

        return require(resolvedPath);
    }
    throw new Error(`[Security] 模組 "${namer}" 不在白名單中，禁止使用。`);
};
