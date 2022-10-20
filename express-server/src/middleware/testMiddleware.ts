import { Request, Response, NextFunction } from "express";

const wordOfDay = require('../helpers/getWordOfDay');

export interface WordRequest extends Request {
  getWordOfDay?: Function;
}

const testMiddleware = async (req: WordRequest, res: Response, next: NextFunction) => {
    const userAgent = req.header('user-agent');
    if(!userAgent?.includes('cypress')) {
      req.getWordOfDay = wordOfDay;
      return next();
    } 
      req.getWordOfDay = () => 'HELLO';
      return next();
}

module.exports = testMiddleware;