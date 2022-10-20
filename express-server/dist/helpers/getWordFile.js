"use strict";
const getWordFile = () => {
    const fs = require('fs');
    if (fs.existsSync('src/data/word.json')) {
        return JSON.parse(fs.readFileSync('src/data/word.json', 'utf8'));
    }
    fs.writeFileSync('../data/word.json', "{}");
};
module.exports = getWordFile;
