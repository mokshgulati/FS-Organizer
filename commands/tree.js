// no need to install with npm
// They work with node just fine
let fs = require("fs");
let path = require("path");

// If path entered is incorrect or empty
function fn(srcPath) {
    if (srcPath == undefined) {
        supportFn(process.cwd(), "");
        return;
    }
    let doesExists = fs.existsSync(srcPath);
    if (doesExists) {
        supportFn(srcPath, "");
    } else {
        console.log("Wrong path! Kindly check the path before entering.");
    }
}

// recursive function to create tree with deep sync
function supportFn(srcPath, indent) {
    let baseName = path.basename(srcPath);
    let isFile = fs.lstatSync(srcPath).isFile();
    if (isFile) {
        console.log(indent + "├──" + baseName);
    } else {
        console.log(indent + "└──" + baseName);
        let children = fs.readdirSync(srcPath);
        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(srcPath, children[i]);
            supportFn(childPath, indent + "\t");
        }
    }
}

// exports the objects with an alias name to be used (after importing)
module.exports = {
    fxn: fn
}