let help = require("./commands/help");
let tree = require("./commands/tree");
let organize = require("./commands/organize");

let input = process.argv.slice(2);
let cmd = input[0];
let realPath = input[1];

switch (cmd) {
    case "help":
        help.fxn();
        break;
    case "tree":
        tree.fxn(realPath);
        break;
    case "organize":
        organize.fxn(realPath);
        break;
    default:
        console.log("Wrong Command! Kindly enter <help> to see all commands.")
}