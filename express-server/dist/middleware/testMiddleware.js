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
Object.defineProperty(exports, "__esModule", { value: true });
const wordOfDay = require('../helpers/getWordOfDay');
const testMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userAgent = req.header('user-agent');
    if (!(userAgent === null || userAgent === void 0 ? void 0 : userAgent.includes('cypress'))) {
        req.getWordOfDay = wordOfDay;
        return next();
    }
    req.getWordOfDay = () => 'HELLO';
    return next();
});
module.exports = testMiddleware;
