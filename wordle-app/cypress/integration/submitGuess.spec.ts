/// <reference types="Cypress" />

describe('Submitting a complete guess', () => {
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });
    it('When user inputs a 5 letter guess and presses enter, guess is submitted and tile background colors are added', () => {
      cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
          const guess = ["L", "E", "A", "F", "Y"];
          cy.wrap(tile)
          .type(guess[index])
          .should('have.text', guess[index])
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
      })
      cy.get('.submitted-tile').then((tile) => {
        cy.wrap(tile[0]).should('have.class', 'bg-yellow-400')
        cy.wrap(tile[1]).should('have.class', 'bg-green-600')
        cy.wrap(tile[2]).should('have.class', 'bg-gray-500')
        cy.wrap(tile[3]).should('have.class', 'bg-gray-500')
        cy.wrap(tile[4]).should('have.class', 'bg-gray-500')
      })
    })
  });
  