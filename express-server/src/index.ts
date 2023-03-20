import express, { Response } from "express";
import bodyParser from 'body-parser';
const checkTiles = require('./helpers/checkTiles');
const getWordOfDay = require('./helpers/getWordOfDay');
const isWin = require('./helpers/isWin');
const virtualKeyboardClasses = require('./helpers/virtualKeyboardClasses');
const isLoss = require('./helpers/isLoss');
const isWordValid = require('./helpers/isWordValid');
const cors = require('cors')
const testMiddleware = require('./middleware/testMiddleware');
import { WordRequest } from "./middleware/testMiddleware";

const PORT = process.env.PORT || 5001;

(async () => {

  const app = express();
  getWordOfDay();

  // middleware
  app.use(bodyParser.json())
  app.use(cors());
  
  /* 
  === Design Patterns Assignment === 
   The testMiddleware function can be viewed as utilizing the Chain of Responsibility pattern. This middleware handles the req object before the route receives the request.The testMiddleware adds a property getWordOfDay with a value of the getWordOfDay function. The return of this function is determined by the headers user-agent. For example, the getWordOfDay function will return the game's word of the day if the user-agent is the player's computer. If the user-agent contains Cypress, the function will return the pre-set word of the day, "HELLO", for testing. After handling this logic and data, the testMiddleware passes the modified request object to each route which are the next handlers in the chain of responsibility of the getWordOfDay function. */
  app.use(testMiddleware);

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  // routes
  app.post("/api/check-tiles", async (req: WordRequest, res: Response) => {
    try {
      const data = await req.body;
      if (!data) {
        return res.status(400).end()
      }
        const guess = data.guess;
        if (req.getWordOfDay) {
          const getWord = req.getWordOfDay
          const word = getWord()
          const evaluations = checkTiles(guess, word);
          return res.status(200).json({evaluations: evaluations})
      }
      return res.status(400).end()
    } catch (e) {
      console.error(e)
      res.status(400).end();
    }
  });

  app.post('/api/check-guess', async (req: WordRequest, res: Response) => {
    try {
      const data = await req.body;
      if (!data) {
        return res.status(400).end()
      }
      const guess = data.guess
      const rowIndex = data.rowIndex
      if (req.getWordOfDay) {
        const getWord = req.getWordOfDay
        const word = getWord()
        const valid = isWordValid(guess, word)
        const win = isWin(guess, word)
        const loss = isLoss(guess, rowIndex, word)
      // only send word if loss === true
        if (loss) {
          return res.status(200).json({word: word, isLoss: loss, isValid: valid})
        } 
          return res.status(200).json({isValid: valid, isWin: win, isLoss: loss})
      }
      return res.status(400).end()
    } catch (e) {
      console.error(e)
      res.status(400).end();
    }
  });

  app.post("/api/check-classes", async (req: WordRequest, res: Response) => {
    try { 
      const data = await req.body;
      if (!data) {
        return res.status(400).end()
      }
        const guess = data.guess
        if (req.getWordOfDay) {
          const getWord = req.getWordOfDay
          const word = getWord()
          const classes = virtualKeyboardClasses(guess, word);
          return res.status(200).send({correctLetters: classes[0], presentLetters: classes[1], absentLetters: classes[2]})
        }
        return res.status(400).end()
    } catch (e) {
      console.error(e)
      res.status(400).end();
    }
  });

}) ();
