let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function fn(srcPath) {
    if (srcPath == undefined) {
        organizeFiles(process.cwd());
        return;
    }
    let doesExists = fs.existsSync(srcPath);
    if (doesExists) {
        organizeFiles(srcPath);
    } else {
        console.log("Wrong path! Kindly check the path before entering.");
    }
}

function organizeFiles(srcPath) {
    let organizeFilesPath = path.join(srcPath, "organized_files");
    if (!fs.existsSync(organizeFilesPath)) {
        fs.mkdirSync(organizeFilesPath);
    }
    let allTheContent = fs.readdirSync(srcPath);
    for (let i = 0; i < allTheContent.length; i++) {
        let contentPath = path.join(srcPath, allTheContent[i]);
        if (fs.lstatSync(contentPath).isFile()) {
            let folderName = classify(contentPath);
            let folderPath = path.join(organizeFilesPath, folderName);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            copyFiles(contentPath, folderPath);
        }
    }
}

function copyFiles(contentPath, folderPath) {
    let fileName = path.basename(contentPath);
    let fileDest = path.join(folderPath, fileName);
    fs.copyFileSync(contentPath, fileDest);
    fs.unlinkSync(contentPath);
}

function classify(files) {
    let extension = path.extname(files);
    extension = extension.slice(1);
    for (let key in types) {
        for (let i = 0; i < types[key].length; i++) {
            if (extension == types[key][i]) {
                return key;
            }
        }
    }
    return "others";
}

module.exports = {
    fxn: fn
}