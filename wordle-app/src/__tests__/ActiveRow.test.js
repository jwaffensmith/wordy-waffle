/** 
   * @jest-environment jsdom
*/

import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import ActiveRow from '../rows/ActiveRow';

test('Active row displays current guess', async () => {
    const guess = ["H", "E", "L", "L", "O"]
    render(<ActiveRow guess={guess} />)
    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const tile = await screen.findByTestId(`active-tile-${i}-${letter}`)
        expect(tile.textContent).toMatch(letter)
    }
});
