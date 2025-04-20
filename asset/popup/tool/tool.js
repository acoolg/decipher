import { tool } from "../../data/tool.js";

tool.forEach(e => {
    document.getElementById("tool").innerHTML += `
    <div class="tool" onclick="window.importTool('${e.name}')">${e.name}</div>
    `
});