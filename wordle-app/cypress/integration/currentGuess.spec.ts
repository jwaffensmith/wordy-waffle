/// <reference types="Cypress" />

describe('Current Guess', () => {
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });
    it('User\'s current guess is displayed in active row', () => {
    cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
        const guess = ["M", "E", "D", "I", "A"];
        cy.wrap(tile)
        .type(guess[index])
        .should('have.text', guess[index]);
        })
    })
  })  
})  