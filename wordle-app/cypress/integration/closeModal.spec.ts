/// <reference types="Cypress" />

describe('User can close modal', () => {
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });

    it('Modal closes when user clicks on the x', () => {
      const guesses: string[][] = [
        ["M", "E", "D", "I", "A"],
        ["H", "A", "P", "P", "Y"],
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
        cy.reload()
        cy.get('#modal').should('contain', 'Game in Progress')
        cy.get('.close-modal').click()
        cy.get('#modal').should('not.be.visible')
    })


    it('Modal closes when user presses escape', () => {
      const guesses: string[][] = [
        ["M", "E", "D", "I", "A"],
        ["H", "A", "P", "P", "Y"],
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
        cy.reload()
        cy.get('#modal').should('contain', 'Game in Progress')
        cy.get('#modal').type('{esc}', {force: true})
        cy.get('#modal').should('not.be.visible')
    })
});