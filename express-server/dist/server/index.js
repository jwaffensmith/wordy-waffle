"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bodyParser from 'body-parser';
const fs = require('fs');
const words = require('./data/words.json');
const getWordKey = require('./helpers/getWordKey');
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
// middleware
// app.use(bodyParser.json())
// helper function for writing to file 
const writeTextToFileAsync = (content) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs.writeFile('./data/word.json', content, (err) => {
        if (err)
            throw err;
    });
});
app.get("/api/word", (req, res, next) => {
    fs.readFile("./data/word.json", "utf8", (err, data) => {
        if (err) {
            next(err);
        }
        else {
            const fileData = JSON.parse(data);
            const key = getWordKey("word");
            const solution = fileData.hasOwnProperty(key);
            if (solution === false) {
                const newWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
                res.send({ word: newWord });
                writeTextToFileAsync(`{"${key}" : "${newWord}"}`);
            }
            else {
                res.send({ word: fileData[key] });
                console.log({ word: fileData[key] });
            }
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
