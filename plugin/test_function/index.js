console.log("load success");
const module1 = require("./test_module");
const module2 = require("./test_module_2");
module1.module();
module2();
console.log(__dirname);
console.log(__filename);