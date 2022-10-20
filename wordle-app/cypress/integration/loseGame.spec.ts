/// <reference types="Cypress" />

describe('Game Loss', () => {
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });
 
    it('After 6 incorrect guesses, user sees end of game modal and the word of the day', () => {
      const guesses: string[][] = [
        ["H", "A", "P", "P", "Y"],
        ["L", "E", "A", "F", "Y"],
        ["W", "O", "R", "L", "D"],
        ["H", "A", "P", "P", "Y"],
        ["L", "E", "A", "F", "Y"],
        ["W", "O", "R", "L", "D"],
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
      });
      cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
          cy.wrap(tile)
          .type(guesses[3][index])
          .should('have.text', guesses[3][index])
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
      });
      cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
          cy.wrap(tile)
          .type(guesses[4][index])
          .should('have.text', guesses[4][index])
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
      });
      cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
          cy.wrap(tile)
          .type(guesses[5][index])
          .should('have.text', guesses[5][index])
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
        cy.get('#modal').should('contain', 'Try Again Tomorrow')
        cy.get('.games-played').should('contain', "1")
        .should('contain', "Played")
        cy.get('.win-percent').should('contain', "0")
        .should('contain', "Win %")
        cy.get('#banner').should('contain', 'HELLO')
      });
      cy.get('.submitted-tile')
      .should('have.length', 30)
      cy.get('.active-tile')
      .should('have.length', 0)
      cy.get('.inactive-tile')
      .should('have.length', 0)
    })
  });