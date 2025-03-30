import { handleCommand } from "./asset/data/command.js";

export var cipherText = "";
var text = document.getElementById('textBox');
var terminal = document.getElementById('terminal');

var tool = [
    {
        name: "頻率分析",
        dir: "asset/tool/frequency_analysis.js"
    }
]

document.getElementById("import").addEventListener("click", () => {
    window.open("index.html", "mozillaWindow",`left=${window.screen.width/2 - 275},top=${window.screen.height/2 - 160},width=550,height=320`);
});

window.importTool() = function (toolName) {
    var nameList = tool.map(tool => tool.name)
    if (!nameList.includes(toolName)) return
    var script = document.createElement("script");
    script.src = tool[nameList.indexOf(toolName)].dir;
    console.log(script)
    document.body.appendChild(script);
}

function importTool(toolName) {
    var nameList = tool.map(tool => tool.name)
    if (!nameList.includes(toolName)) return
    var script = document.createElement("script");
    script.src = tool[nameList.indexOf(toolName)].dir;
    console.log(script)
    document.body.appendChild(script);
}

export function update() {
    text.innerHTML = cipherText
}

export function setVar(variable , value) {
    eval(`${variable} = ${value}`)
}

var mouse = {
    x: 0,
    y: 0
}

terminal.addEventListener("keydown" , (e) => {
    if (e.key == "Enter") {
        handleCommand(terminal.value);
        terminal.value = "";
    }
})

document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    // console.log(`${e.clientX}px, ${e.clientY}px`)
})
addEventListener("contextmenu", (event) => {
    console.log("right click")
    event.preventDefault()
});

document.getElementById("textBox").addEventListener("scroll", function () {
    let scrollTop = document.getElementById("textBox").scrollTop;
    // console.log(scrollTop)
    document.getElementById("lineCount").scrollTop = scrollTop;
});

export function countLines() {
    let div = document.getElementById("textBox");
    let range = document.createRange();
    range.selectNodeContents(div);
    let rects = range.getClientRects();

    // 使用陣列來累積 HTML，最後一次性插入，避免頻繁操作 DOM
    let lines = [];
    for (let i = 1; i < rects.length + 1; i++) {
        lines.push(i + "<br>");
    }
    document.getElementById("lineCount").innerHTML = lines.join("");
}

window.addEventListener("resize", countLines);
document.addEventListener("DOMContentLoaded", countLines);