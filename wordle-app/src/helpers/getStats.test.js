import getStats from '../../src/helpers/getStats';

describe('test getStats function', () => {
    test('when given 1 gamesWon and 1 gamesPlayed return string of 100', () => {
        expect(getStats(1,1)).toBe("100");
    })
    test('when given 1 gamesWon and 2 gamesPlayed return string of 50', () => {
        expect(getStats(1,2)).toBe("50");
    })
    test('when given 3 gamesWon and 9 gamesPlayed return string of 33', () => {
        expect(getStats(3,9)).toBe("33");
    })
    test('when given 1 gamesWon and 0 gamesPlayed return string 0', () => {
        expect(getStats(1,0)).toBe("0");
    })
    test('when given 1 gamesWon and 1 gamesPlayed return string 0', () => {
        expect(getStats(0,0)).toBe("0");
    })
});