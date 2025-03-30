import { update, setVar, countLines } from "../../main.js";

var text = document.getElementById('textBox');

export function handleCommand(command) {
    var args = command.split(' ');
    var cmd = args[0]; 
    var params = args.slice(1);
    switch(cmd) {
        case 'text':
            if (params[0] == "import") {
                setVar("cipherText", `"${getText(2, command)}"`)
                update()
                countLines()
            }
            break;
        case 'help':
            help();
            break;
        case 'js':
            eval(getText(1, command));
    }
}

function getText(paramsLength, command) {
    var args = command.split(' ');
    var params = args.slice(1);
    var text = '';
    for (var i = paramsLength - 1; i < args.length - 1; i++) {
        text += params[i] + ' ';
    }
    console.log(text)
    return text;
}