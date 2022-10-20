"use strict";
const getWord = () => {
    const getWordKey = require('./getWordKey');
    const fs = require('fs');
    const wordData = fs.readFileSync('src/data/word.json', "utf8");
    const fileData = JSON.parse(wordData);
    const key = getWordKey("word");
    const word = fileData[key];
    return word;
};
module.exports = getWord;
