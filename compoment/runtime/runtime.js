const ALLOWED_LIBS = require("./api/libraries");
const fs = require("fs");
const path = require("path");

module.exports = class DumbRuntime {
    async run(file, dir, name = "plugin") {
        const code = await fs.promises.readFile(file, "utf-8");
        this.executeWithSandbox(code, dir, name);
    }

    executeWithSandbox(code, dir, name) {
        // 1. 準備模組容器
        const module = { exports: {} };
        const exports = module.exports;

        // 2. 定義遞迴 require
        const fakeRequire = (namer) => {
            if (ALLOWED_LIBS[namer]) {
                console.log(`[${name}]` + "嘗試存取檔案: " + namer);
                return ALLOWED_LIBS[namer];
            } 
            
            if (namer.startsWith("./")) {
                
                const targetPath = path.resolve(dir, namer);
                const relative = path.relative(dir, targetPath);
                // 自動補全 .js 副檔名（模仿原生行為）
                const finalPath = targetPath.endsWith('.js') ? targetPath : targetPath + '.js';
                const targetDir = path.dirname(finalPath);

                console.log(`[${name}]` + "嘗試存取" + targetPath);

                if (!fs.existsSync(finalPath)) {
                    throw new Error(`找不到檔案: ${finalPath}`);
                }

                if(relative.startsWith("..") || path.isAbsolute(relative)){
                    throw new Error(`[Security] 試圖非法存取目錄外檔案: ${namer}`);
                }

                const childCode = fs.readFileSync(finalPath, "utf-8");
                // 遞迴執行，並拿回子檔案的 module.exports
                return this.executeWithSandbox(childCode, targetDir, name);
            }

            throw new Error(`[Security] 禁止存取模組: ${namer}`);
        };

        // 3. 注入環境變數 (require, module, exports)
        try {
            const runner = new Function("require", "module", "exports", "__dirname", "__filename",`
                (function(require, module, exports, __dirname, __filename) { 
                    "use strict"; 
                    ${code} 
                }).call(module.exports, require, module, exports, __dirname, __filename);
            `);

            // 執行插件代碼
            runner(fakeRequire, module, exports, dir, "not_real_path_for_security");
            
            // 4. 回傳插件導出的內容
            return module.exports;
        } catch (e) {
            console.error(`[${name}] 執行錯誤:`, e);
            throw e;
        }
    }
};
