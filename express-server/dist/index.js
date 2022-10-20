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
const body_parser_1 = __importDefault(require("body-parser"));
const checkTiles = require('./helpers/checkTiles');
const getWordOfDay = require('./helpers/getWordOfDay');
const isWin = require('./helpers/isWin');
const virtualKeyboardClasses = require('./helpers/virtualKeyboardClasses');
const isLoss = require('./helpers/isLoss');
const isWordValid = require('./helpers/isWordValid');
const cors = require('cors');
const testMiddleware = require('./middleware/testMiddleware');
const PORT = process.env.PORT || 5001;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    getWordOfDay();
    // middleware
    app.use(body_parser_1.default.json());
    app.use(cors());
    /*
    === Design Patterns Assignment ===
     The testMiddleware function can be viewed as utilizing the Chain of Responsibility pattern. This middleware handles the req object before the route receives the request.The testMiddleware adds a property getWordOfDay with a value of the getWordOfDay function. The return of this function is determined by the headers user-agent. For example, the getWordOfDay function will return the game's word of the day if the user-agent is the player's computer. If the user-agent contains Cypress, the function will return the pre-set word of the day, "HELLO", for testing. After handling this logic and data, the testMiddleware passes the modified request object to each route which are the next handlers in the chain of responsibility of the getWordOfDay function. */
    app.use(testMiddleware);
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
    // routes
    app.post("/api/check-tiles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield req.body;
            if (!data) {
                return res.status(400).end();
            }
            // remove after debugging
            console.log(req.body);
            const guess = data.guess;
            if (req.getWordOfDay) {
                const getWord = req.getWordOfDay;
                const word = getWord();
                const evaluations = checkTiles(guess, word);
                // remove after debugging
                console.log(evaluations);
                return res.status(200).json({ evaluations: evaluations });
            }
            return res.status(400).end();
        }
        catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }));
    app.post('/api/check-guess', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield req.body;
            if (!data) {
                return res.status(400).end();
            }
            // remove after debugging
            console.log(req.body);
            const guess = data.guess;
            const rowIndex = data.rowIndex;
            if (req.getWordOfDay) {
                const getWord = req.getWordOfDay;
                const word = getWord();
                const valid = isWordValid(guess, word);
                const win = isWin(guess, word);
                const loss = isLoss(guess, rowIndex, word);
                // only send word if loss === true
                if (loss) {
                    return res.status(200).json({ word: word, isLoss: loss, isValid: valid });
                }
                return res.status(200).json({ isValid: valid, isWin: win, isLoss: loss });
            }
            return res.status(400).end();
        }
        catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }));
    app.post("/api/check-classes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield req.body;
            if (!data) {
                return res.status(400).end();
            }
            // remove after debugging
            console.log(req.body);
            const guess = data.guess;
            if (req.getWordOfDay) {
                const getWord = req.getWordOfDay;
                const word = getWord();
                const classes = virtualKeyboardClasses(guess, word);
                return res.status(200).send({ correctLetters: classes[0], presentLetters: classes[1], absentLetters: classes[2] });
            }
            return res.status(400).end();
        }
        catch (e) {
            console.error(e);
            res.status(400).end();
        }
    }));
}))();
