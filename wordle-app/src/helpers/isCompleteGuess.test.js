import isCompleteGuess from '../../src/helpers/isCompleteGuess';

describe('test isCompleteGuess function', () => {
    test('5 letter guess should return true', () => {
        expect(isCompleteGuess(['H', 'E', 'L', 'L', 'O'])).toBe(true);
    })
    test('0 letter guess or empty array should return false', () => {
        expect(isCompleteGuess([])).toBe(false);
    })
    test('3 letter guess should return false', () => {
        expect(isCompleteGuess(['H', 'E', 'L'])).toBe(false);
    })
    test('6 letter guess should return false', () => {
        expect(isCompleteGuess(['H', 'E', 'L', 'L', 'O', 'H'])).toBe(false);
    })
})