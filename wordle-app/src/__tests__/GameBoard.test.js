/** 
   * @jest-environment jsdom
*/

import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import GameBoard from '../GameBoard';

test('Gameboard displays active tiles,submitted tiles, and inactive tiles based on current and previous guesses', () => {
    const guesses = ["HELLO"];
    render(< GameBoard guess={["H","A"]} guessedWords={guesses} rowIndex={2} gameStatus={"inProgress"}/>)
    const inactiveTile = screen.getAllByTestId('inactive-tile-0')
    const activeTile = screen.getAllByTestId("active-tile-0-H")
    expect(inactiveTile.length).toBe(4)
    expect(activeTile.length).toBe(1)
});
