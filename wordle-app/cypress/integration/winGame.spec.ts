/// <reference types="Cypress" />

describe('Game Win', () => {
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });
 
    it('When player guesses the word of the day, active tiles change green,  modal appears, and message says \'Splendid\'', () => {
      const guesses: string[][] = [
        ["M", "E", "D", "I", "A"],
        ["P", "R", "I", "M", "E"],
        ["H", "E", "L", "L", "O"],
      ]
      cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
          cy.wrap(tile)
          .type(guesses[0][index])
          .should('have.text', guesses[0][index])
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
      })
      cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
          cy.wrap(tile)
          .type(guesses[1][index])
          .should('have.text', guesses[1][index]);
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
      })
      cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
          cy.wrap(tile)
          .type(guesses[2][index])
          .should('have.text', guesses[2][index])
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
        cy.get('#modal').should('contain', 'Well done!')
        cy.get('.games-played').should('contain', "1")
        .should('contain', "Played")
        cy.get('.win-percent').should('contain', "100")
        .should('contain', "Win %")
        cy.get('#banner').should('contain', 'Splendid')
      });
      cy.get('.submitted-tile').then((tile) => {
        cy.wrap(tile).should('have.class', 'bg-green-600')
      })
      cy.get('.submitted-tile').should('have.length', 15)
      cy.get('.inactive-tile').should('be.empty')
    })
  });