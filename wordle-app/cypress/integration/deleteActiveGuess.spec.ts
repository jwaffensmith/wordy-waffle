/// <reference types="Cypress" />

describe('Backspace', () => {
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });
    
    it('Pressing backspace will delete letter from current tile', () => {
        const guess: string[] = ["W", "O", "R"];
        guess.forEach((letter, index) => {
          cy.get(`[data-cy="active-tile-${index}"]`)
          .type(letter)
          .should('have.text', letter)
        })
        cy.get('[data-cy="active-tile-2"]')
        .type('{backspace}')
        .should('be.empty')
        cy.get('[data-cy="active-tile-1"]')
        .type('{backspace}')
        .should('be.empty')
    })

  });