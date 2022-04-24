function fn() {
    console.log(`list of all commands :-
    1. node main.js help
    2. node main.js tree "path"
    3. node main.js organize "path"`);
}

// exports the objects with an alias name to be used (after importing)
module.exports = {
    fxn: fn
}