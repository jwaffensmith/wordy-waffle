"use strict";
const wordList = require('../data/words.json');
const wordFile = require('./getWordFile');
const wordKey = require('./getWordKey');
const writeFile = require('./writeTextToFileAsync');
const getWordOfDay = () => {
    const wordData = wordFile();
    const key = wordKey("word");
    const solution = wordData.hasOwnProperty(key);
    if (!solution) {
        const newWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
        writeFile('src/data/word.json', `{"${key}" : "${newWord}"}`);
        return newWord;
    }
    return wordData[key];
};
module.exports = getWordOfDay;
