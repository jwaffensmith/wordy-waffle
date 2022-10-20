/// <reference types="Cypress" />

describe('Invalid Word', () => {
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });
    
    it('User see\'s message "Not in word list" when submitting an invalid word', () => {
        const guess: string[] = ["A", "B", "C", "D", "E"];
        guess.forEach((letter, index) => {
          cy.get(`[data-cy="active-tile-${index}"]`)
          .type(letter)
          .should('have.text', letter)
        })
        cy.get('[data-cy="active-tile-4"]')
        .type('{enter}')
        cy.get('#banner').should('contain', 'Not in word list')
    })
  });